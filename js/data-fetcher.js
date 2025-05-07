class DataFetcher {
    constructor(sheetUrl) {
        this.sheetUrl = sheetUrl;
        console.log("DataFetcher initialized with URL:", sheetUrl);
    }

    async fetchData() {
        try {
            console.log("Attempting to fetch data from:", this.sheetUrl);
            let response;
            
            try {
                // First attempt with the provided URL
                response = await fetch(this.sheetUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }
            } catch (fetchError) {
                console.warn("Initial fetch failed:", fetchError.message);
                
                // If the URL contains a CORS proxy, try without it
                if (this.sheetUrl.includes('corsproxy.io')) {
                    const originalUrl = decodeURIComponent(this.sheetUrl.split('corsproxy.io/?')[1]);
                    console.log("Trying without CORS proxy:", originalUrl);
                    
                    response = await fetch(originalUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch data directly: ${response.status}`);
                    }
                } 
                // If no CORS proxy was used initially, try with a different one
                else {
                    // Try with a different CORS proxy
                    const alternativeProxy = 'https://api.allorigins.win/raw?url=';
                    const alternativeUrl = alternativeProxy + encodeURIComponent(this.sheetUrl);
                    console.log("Trying alternative CORS proxy:", alternativeUrl);
                    
                    response = await fetch(alternativeUrl);
                    if (!response.ok) {
                        throw fetchError; // Re-throw original error if this also fails
                    }
                }
            }
            
            const csvData = await response.text();
            if (!csvData || csvData.trim().length === 0) {
                throw new Error('Empty data received from Google Sheets');
            }
            
            console.log("CSV data received, first 200 chars:", csvData.substring(0, 200));
            
            const parsedData = this.parseCSV(csvData);
            console.log("Parsed CSV into", parsedData.length, "rows");
            
            if (parsedData.length === 0) {
                throw new Error('No valid rows found in the CSV data');
            }
            
            const transformedData = this.transformData(parsedData);
            console.log("Transformed data into", transformedData.length, "bike objects");
            
            if (transformedData.length === 0) {
                throw new Error('No valid bike data found after transformation');
            }
            
            return {
                products: transformedData
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            
            // Update the error message text
            const errorTextElement = document.getElementById('error-text');
            if (errorTextElement) {
                errorTextElement.textContent = error.message;
            } else {
                // Fallback for backward compatibility
                document.getElementById('error-message').innerHTML = `
                    <p>Error loading data: ${error.message}</p>
                    <p>This could be due to:</p>
                    <ul>
                        <li>The Google Sheet URL may not be accessible</li>
                        <li>The sheet may not be published correctly with the correct permissions</li>
                        <li>There might be a network or CORS issue with your browser</li>
                    </ul>
                    <p>Try opening your browser's developer console (F12) for more details.</p>
                `;
            }
            
            // Show the error message and hide loading indicator
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('loading-indicator').style.display = 'none';
            throw error;
        }
    }

    parseCSV(csv) {
        try {
            const lines = csv.split('\n');
            console.log("CSV contains", lines.length, "lines");
            
            if (lines.length < 2) {
                console.warn("CSV data has fewer than 2 lines, may be incomplete:", csv);
                document.getElementById('error-message').textContent = "The data from Google Sheets appears to be incomplete or missing. Please check your published sheet URL.";
                document.getElementById('error-message').style.display = 'block';
            }
            
            const headers = lines[0].split(',').map(h => h.trim());
            console.log("CSV headers:", headers);
            
            return lines.slice(1)
                .filter(line => line.trim() !== '')
                .map(line => {
                    const values = this.splitCSVLine(line);
                    const row = {};
                    
                    headers.forEach((header, index) => {
                        row[header] = values[index] || '';
                    });
                    
                    return row;
                });
        } catch (error) {
            console.error("Error parsing CSV:", error);
            document.getElementById('error-message').textContent = `Error parsing data: ${error.message}`;
            document.getElementById('error-message').style.display = 'block';
            return [];
        }
    }

    splitCSVLine(line) {
        const values = [];
        let currentValue = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        
        values.push(currentValue.trim());
        return values;
    }
    
    extractNumber(value) {
        if (!value) return 0;
        const match = String(value).match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[0]) : 0;
    }

    transformData(bikeRows) {
        console.log("Starting transformation of", bikeRows.length, "rows");
        console.log("First row sample:", bikeRows[0] ? JSON.stringify(bikeRows[0]) : "No rows");
        
        // Transform rows into products
        const products = bikeRows
            .filter(row => {
                // Ensure we have valid bikes with at least a model or brand
                const hasModelOrBrand = row.Model || row.Brand;
                if (!hasModelOrBrand) {
                    console.warn("Skipping row without Model or Brand:", row);
                }
                return hasModelOrBrand;
            })
            .map((row, index) => {
                // Check available columns and map to our expected fields
                const price = this.extractNumber(row.Price || 0);
                const model = row.Model || '';
                const brand = row.Brand || '';
                
                // Extract battery capacity from the 'Capicity (Wh)' column
                const batteryPower = this.extractNumber(row['Capicity (Wh)'] || 0);
                
                // Extract range, looking at specific column names from the sheet
                const rangeElectric = this.extractNumber(row['Range(electric)'] || 0);
                const rangePas = this.extractNumber(row['Range(pas)'] || 0);
                
                // Extract top speed from 'Top Speed' column
                const topSpeed = this.extractNumber(row['Top Speed'] || 0);
                
                // Score brakes and suspension
                const brakes = this.scoreBreaks(row.Breaks || '');
                const suspension = this.scoreSuspension(row.suspension || '');
                
                // Extract rating and popularity
                const rating = this.extractRating(row.rating || 0);
                const popularity = this.extractNumber(row.Poularity || 0);
                
                // Extract image URL
                const imageUrl = row.ImageURL || '';
                
                // Extract Amazon link
                const link = row.link || '#';
                
                // Extract special features
                const specialFeatures = row['Special Features'] ? 
                    row['Special Features'].split('\n').map(f => f.trim()).filter(f => f.length > 0) : 
                    [];
                
                // Normalized specs for comparison
                const normalizedSpecs = {
                    batteryPower: batteryPower,
                    rangeElectric: rangeElectric,
                    rangePas: rangePas,
                    topSpeed: topSpeed,
                    breaks: brakes,
                    suspension: suspension,
                    rating: rating,
                    popularity: popularity,
                    price: price
                };
                
                console.log(`Processed bike: ${brand} ${model} (${price})`);
                
                // Create bike object
                return {
                    id: index + 1,
                    name: `${brand} ${model}`.trim(),
                    model: model,
                    brand: brand,
                    price: price,
                    image: imageUrl,
                    description: this.generateDescription(row),
                    specs: {
                        batteryPower: batteryPower,
                        rangeElectric: rangeElectric,
                        rangePas: rangePas,
                        topSpeed: topSpeed,
                        breaks: row.Breaks || '',
                        suspension: row.suspension || '',
                        rating: row.rating || '',
                        popularity: popularity,
                        motorPower: row['Motor Power'] || ''
                    },
                    normalizedSpecs: normalizedSpecs,
                    link: link,
                    features: this.extractFeatures(row, specialFeatures)
                };
            });
        
        // Normalize the specs
        this.normalizeSpecs(products);
        
        return products;
    }
    
    // Extract features from special features and other columns
    extractFeatures(row, specialFeatures) {
        const features = [];
        
        // Add motor power info
        if (row['Motor Power']) {
            features.push(`${row['Motor Power']} motor`);
        }
        
        // Add battery info
        if (row['Capicity (Wh)']) {
            features.push(`${row['Capicity (Wh)']} battery capacity`);
        }
        
        // Add range info
        if (row['Range(electric)']) {
            features.push(`${row['Range(electric)']} mile electric range`);
        }
        
        if (row['Range(pas)']) {
            features.push(`${row['Range(pas)']} mile pedal assist range`);
        }
        
        // Add speed info
        if (row['Top Speed']) {
            features.push(`${row['Top Speed']} top speed`);
        }
        
        // Add tire info
        if (row['Tire Size']) {
            features.push(`${row['Tire Size']} tires`);
        }
        
        // Add brake info
        if (row.Breaks) {
            features.push(`${row.Breaks} braking system`);
        }
        
        // Add suspension info
        if (row.suspension) {
            features.push(`${row.suspension} suspension`);
        }
        
        // Add special features from list
        if (specialFeatures && specialFeatures.length > 0) {
            features.push(...specialFeatures);
        }
        
        return features;
    }
    
    // Generate a product description
    generateDescription(row) {
        let description = `The ${row.Brand} ${row.Model} is a versatile electric bike `;
        
        // Add power details
        if (row['Motor Power']) {
            description += `featuring a powerful ${row['Motor Power']} motor `;
        }
        
        // Add battery details
        if (row['Capicity (Wh)']) {
            description += `and a ${row['Capicity (Wh)']} battery capacity. `;
        } else {
            description += `. `;
        }
        
        // Add range details
        if (row['Range(electric)']) {
            description += `It offers up to ${row['Range(electric)']} miles of electric range `;
            
            if (row['Range(pas)']) {
                description += `and ${row['Range(pas)']} miles of pedal assist range `;
            }
            
            if (row['Top Speed']) {
                description += `with a top speed of ${row['Top Speed']}. `;
            } else {
                description += `. `;
            }
        }
        
        // Add tire info
        if (row['Tire Size']) {
            description += `Equipped with ${row['Tire Size']} tires `;
            
            if (row.suspension) {
                if (row.suspension.toLowerCase().includes('dual')) {
                    description += `and dual suspension for maximum comfort. `;
                } else if (row.suspension.toLowerCase().includes('front')) {
                    description += `and front suspension for improved handling. `;
                } else if (row.suspension.toLowerCase().includes('rear')) {
                    description += `and rear suspension for added comfort. `;
                } else {
                    description += `. `;
                }
            } else {
                description += `. `;
            }
        }
        
        // Add availability info if available
        if (row.availability) {
            description += `Currently ${row.availability.toLowerCase()}. `;
        }
        
        return description;
    }
    
    // Normalize the specs for fair comparison
    normalizeSpecs(products) {
        // Find min/max values for each spec
        const minMax = {
            batteryPower: { min: Infinity, max: -Infinity },
            rangeElectric: { min: Infinity, max: -Infinity },
            rangePas: { min: Infinity, max: -Infinity },
            topSpeed: { min: Infinity, max: -Infinity },
            popularity: { min: Infinity, max: -Infinity }
            // breaks and suspension are already scored in their specific functions
            // rating is already normalized in extractRating
        };
        
        // Find min/max for each spec
        products.forEach(product => {
            for (const spec in minMax) {
                const value = product.normalizedSpecs[spec];
                if (value !== undefined && !isNaN(value)) {
                    minMax[spec].min = Math.min(minMax[spec].min, value);
                    minMax[spec].max = Math.max(minMax[spec].max, value);
                }
            }
        });
        
        console.log("Min/Max values for normalization:", minMax);
        
        // Normalize each product's specs
        products.forEach(product => {
            // Normalize remaining specs
            for (const spec in minMax) {
                const value = product.normalizedSpecs[spec];
                const range = minMax[spec].max - minMax[spec].min;
                
                if (range === 0) {
                    product.normalizedSpecs[spec] = 1; // All products have the same value
                } else if (spec === 'popularity') {
                    // For popularity, lower is better (inverse scoring)
                    product.normalizedSpecs[spec] = (minMax[spec].max - value) / range;
                } else {
                    // For other specs, higher is better
                    product.normalizedSpecs[spec] = (value - minMax[spec].min) / range;
                }
            }
            
            // breaks and suspension are already pre-scored to 0-10 range
            product.normalizedSpecs.breaks = product.normalizedSpecs.breaks / 10;
            product.normalizedSpecs.suspension = product.normalizedSpecs.suspension / 10;
        });
    }
    
    // Score brakes: hydraulic = 10, disc = 7, others lower
    scoreBreaks(brakes) {
        if (!brakes) return 5;
        const lower = String(brakes).toLowerCase();
        if (lower.includes('hydraulic')) return 10;
        if (lower.includes('disc')) return 7;
        return 3; // Default for other brake types
    }
    
    // Score suspension: dual = 10, front/rear = 5, none = 0
    scoreSuspension(suspension) {
        if (!suspension) return 0;
        const lower = String(suspension).toLowerCase();
        if (lower.includes('dual')) return 10;
        if (lower.includes('front') || lower.includes('rear')) return 5;
        if (lower === 'no' || lower.includes('none')) return 0;
        return 3; // Default for unknown suspension types
    }
    
    // Extract rating as a number between 0-1 (normalized)
    extractRating(ratingStr) {
        if (!ratingStr) return 0.5;
        
        const match = String(ratingStr).match(/(\d+(\.\d+)?)/);
        if (!match) return 0.5;
        
        const rating = parseFloat(match[0]);
        
        // Assuming ratings are out of 5
        if (ratingStr.includes('out of 5')) {
            return rating / 5;
        }
        
        // If no scale mentioned, assume it's already normalized or out of 5
        return rating > 5 ? rating / 10 : rating / 5;
    }
}