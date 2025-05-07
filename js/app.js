// Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing app...");
    
    // Your published Google Sheet URL for the electric bikes data
    const ORIGINAL_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOIg4QNG9-gcRqNepsv76q_gihXzOWwklbcwI7dlcEd4tfnrpKR3NgfDLgxW150h77OjGttV5frw0p/pub?gid=0&single=true&output=csv';
    
    // Use a CORS proxy to avoid cross-origin issues
    const CORS_PROXY = 'https://corsproxy.io/?';
    const SHEET_URL = CORS_PROXY + encodeURIComponent(ORIGINAL_SHEET_URL);
    
    console.log("Using proxied URL:", SHEET_URL);
    
    // Start loading indicator
    document.getElementById('loading-indicator').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
    
    try {
        // Initialize data fetcher directly to test
        const dataFetcher = new DataFetcher(SHEET_URL);
        
        // Fetch the data
        dataFetcher.fetchData()
            .then(data => {
                console.log("Data fetched successfully:", data);
                
                // Initialize the decision matrix directly with the fetched data
                window.decisionMatrix = new BikeDecisionMatrix(null, data);
                
                // Hide loading indicator when done
                document.getElementById('loading-indicator').style.display = 'none';
            })
            .catch(error => {
                console.error("Error in data fetching:", error);
                document.getElementById('loading-indicator').style.display = 'none';
                
                // Show error message (handled by data-fetcher.js)
            });
    } catch (error) {
        console.error("Critical error initializing application:", error);
        document.getElementById('loading-indicator').style.display = 'none';
        
        // Show error in error-text element
        const errorTextElement = document.getElementById('error-text');
        if (errorTextElement) {
            errorTextElement.textContent = `Critical error: ${error.message}`;
        }
        document.getElementById('error-message').style.display = 'block';
    }
    
    // Modal close events
    document.querySelector('.close-btn')?.addEventListener('click', () => {
        document.getElementById('product-modal').style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('product-modal')) {
            document.getElementById('product-modal').style.display = 'none';
        }
    });
});

// Bike Decision Matrix Class
class BikeDecisionMatrix {
    constructor(sheetUrl, sampleData = null) {
        this.bikes = [];
        this.chartUtils = new ChartUtils('scoreChart');
        this.dataFetcher = sampleData ? null : new DataFetcher(sheetUrl);
        this.sampleData = sampleData;
        
        // DOM Elements
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.errorMessage = document.getElementById('error-message');
        this.calculateBtn = document.getElementById('calculate-btn');
        this.resultsSection = document.querySelector('.results-section');
        this.resultsTable = document.getElementById('results-table')?.querySelector('tbody');
        
        // Criteria toggles and sliders
        this.criteria = [
            'batteryPower',
            'rangePas',
            'rangeElectric',
            'topSpeed',
            'breaks',
            'suspension',
            'popularity',
            'rating'
        ];
        
        // Initialize the application
        this.init();
    }
    
    async init() {
        try {
            // Show loading indicator if we're fetching data
            if (!this.sampleData) {
                this.loadingIndicator.style.display = 'block';
                
                // Fetch bike data
                const data = await this.dataFetcher.fetchData();
                this.bikes = data.products;
                
                // Hide loading indicator
                this.loadingIndicator.style.display = 'none';
            } else {
                // Use the sample data directly
                console.log("Using provided sample data");
                this.bikes = this.sampleData.products;
                this.loadingIndicator.style.display = 'none';
            }
            
            // Initialize UI elements
            this.initializeUI();
            
            console.log(`Loaded ${this.bikes.length} electric bikes`);
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to load electric bike data. Please try refreshing the page.');
        }
    }
    
    initializeUI() {
        // Initialize toggle and slider behavior
        this.criteria.forEach(criterion => {
            const toggle = document.getElementById(`${criterion}-toggle`);
            const slider = document.getElementById(`${criterion}-weight`);
            
            if (toggle && slider) {
                // Update slider enabled state based on toggle
                toggle.addEventListener('change', () => {
                    slider.disabled = !toggle.checked;
                    slider.parentElement.classList.toggle('disabled', !toggle.checked);
                });
                
                // Initialize weight display
                const valueDisplay = slider.parentElement.querySelector('.weight-value');
                if (valueDisplay) {
                    valueDisplay.textContent = slider.value;
                    
                    slider.addEventListener('input', () => {
                        valueDisplay.textContent = slider.value;
                    });
                }
            }
        });
        
        // Calculate button event
        if (this.calculateBtn) {
            this.calculateBtn.addEventListener('click', () => {
                this.calculateAndDisplayResults();
            });
        }
    }
    
    calculateAndDisplayResults() {
        // Get selected criteria and weights
        const selectedCriteria = this.getUserWeights();
        
        this.calculateScores(selectedCriteria);
        this.displayTopOptions();
        this.displayAllOptions();
        this.createScatterPlot();
        
        // Show results section
        if (this.resultsSection) {
            this.resultsSection.style.display = 'block';
            this.resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    getUserWeights() {
        const weights = {};
        
        this.criteria.forEach(criterion => {
            const toggle = document.getElementById(`${criterion}-toggle`);
            const slider = document.getElementById(`${criterion}-weight`);
            
            if (toggle && slider && toggle.checked) {
                weights[criterion] = parseInt(slider.value) / 10;
            }
        });
        
        return weights;
    }
    
    calculateScores(weights) {
        if (!this.bikes || this.bikes.length === 0) return;
        
        this.bikes.forEach(bike => {
            let totalScore = 0;
            let totalWeight = 0;
            
            for (const spec in weights) {
                if (weights[spec] > 0 && bike.normalizedSpecs && bike.normalizedSpecs[spec] !== undefined) {
                    totalScore += bike.normalizedSpecs[spec] * weights[spec];
                    totalWeight += weights[spec];
                }
            }
            
            // Calculate score (0-100)
            bike.score = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
            
            // Calculate value ratio (score/price)
            bike.value = bike.price > 0 ? bike.score / bike.price : 0;
        });
        
        // Sort bikes by score
        this.bikes.sort((a, b) => b.score - a.score);
    }
    
    displayTopOptions(topN = 3) {
        if (!this.bikes || this.bikes.length === 0) return;
        
        const topOptionsGrid = document.getElementById('top-options-grid');
        if (!topOptionsGrid) return;
        
        topOptionsGrid.innerHTML = '';
        
        for (let i = 0; i < Math.min(topN, this.bikes.length); i++) {
            const bike = this.bikes[i];
            
            const card = document.createElement('div');
            card.className = 'option-card';
            card.innerHTML = `
                <img src="${bike.image}" alt="${bike.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="option-card-content">
                    <h4>${bike.name}</h4>
                    <p class="score">Score: ${bike.score.toFixed(1)}</p>
                    <p class="price">Price: $${bike.price.toFixed(2)}</p>
                    <button class="details-btn" data-id="${bike.id}">View Details</button>
                </div>
            `;
            
            topOptionsGrid.appendChild(card);
        }
        
        // Add event listeners to the detail buttons
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const bikeId = parseInt(btn.getAttribute('data-id'));
                this.showProductDetails(bikeId);
            });
        });
    }
    
    displayAllOptions() {
        if (!this.bikes || !this.resultsTable) return;
        
        this.resultsTable.innerHTML = '';
        
        // First sort by value (best value first)
        const sortedBikes = [...this.bikes].sort((a, b) => b.value - a.value);
        
        sortedBikes.forEach((bike, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bike.name}</td>
                <td>${bike.score.toFixed(1)}</td>
                <td>$${bike.price.toFixed(2)}</td>
                <td>${(bike.value * 100).toFixed(2)}</td>
                <td><a href="${bike.link}" target="_blank" class="amazon-link">View</a></td>
            `;
            
            this.resultsTable.appendChild(row);
        });
    }
    
    showProductDetails(bikeId) {
        if (!this.bikes) return;
        
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if (!bike) return;
        
        const weights = this.getUserWeights();
        const modalContent = document.getElementById('modal-product-details');
        if (!modalContent) return;
        
        let criteriaHtml = '';
        for (const spec in bike.normalizedSpecs) {
            // Skip price from breakdown
            if (spec === 'price') continue;
            
            const value = bike.normalizedSpecs[spec];
            const specWeight = weights[spec] || 0;
            const specScore = value * 10;
            
            // Add descriptive labels based on scores
            let description = '';
            if (spec === 'breaks') {
                if (specScore >= 9) description = " (Hydraulic)";
                else if (specScore >= 6) description = " (Disc)";
                else description = " (Basic)";
            } else if (spec === 'suspension') {
                if (specScore >= 9) description = " (Dual)";
                else if (specScore >= 4) description = " (Front/Rear)";
                else description = " (None)";
            }
            
            criteriaHtml += `
                <div class="score-bar">
                    <span class="score-bar-label">${this.formatSpecName(spec)}${description}</span>
                    <div class="score-bar-outer">
                        <div class="score-bar-inner" style="width: ${specScore * 10}%"></div>
                    </div>
                    <span class="score-bar-value">${specScore.toFixed(1)}</span>
                </div>
            `;
        }
        
        modalContent.innerHTML = `
            <div class="product-detail">
                <div class="product-image">
                    <img src="${bike.image}" alt="${bike.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                </div>
                <div class="product-info">
                    <h3>${bike.name}</h3>
                    <p>${bike.description || ''}</p>
                    <p class="price">$${bike.price.toFixed(2)}</p>
                    <div class="score-breakdown">
                        <h4>Score Breakdown</h4>
                        ${criteriaHtml}
                    </div>
                    <h4>Features</h4>
                    <ul>
                        ${bike.features ? bike.features.map(feature => `<li>${feature}</li>`).join('') : '<li>No features listed</li>'}
                    </ul>
                    <a href="${bike.link}" class="amazon-link" target="_blank">View on Amazon</a>
                </div>
            </div>
        `;
        
        document.getElementById('product-modal').style.display = 'block';
    }
    
    formatSpecName(spec) {
        switch(spec) {
            case 'batteryPower': return 'Battery Capacity (Wh)';
            case 'rangePas': return 'Range - Pedal Assist (miles)';
            case 'rangeElectric': return 'Range - Electric (miles)';
            case 'topSpeed': return 'Max Speed (mph)';
            case 'breaks': return 'Brakes';
            case 'suspension': return 'Suspension';
            case 'rating': return 'Customer Rating';
            case 'popularity': return 'Popularity (Inverse)';
            default: return spec;
        }
    }
    
    createScatterPlot() {
        if (!this.bikes || this.bikes.length === 0) return;
        
        const data = this.bikes.map(bike => ({
            x: bike.price,
            y: bike.score,
            label: bike.name,
            id: bike.id
        }));
        
        this.chartUtils.createScatterPlot(data, (bikeId) => {
            this.showProductDetails(bikeId);
        });
    }
    
    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.style.display = 'block';
        }
        
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = 'none';
        }
        
        console.error(message);
    }
}