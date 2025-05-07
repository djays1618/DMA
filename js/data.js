// Sample electric bike data
const ebikes = [
    {
        id: 1,
        name: "Ancheer 26\" Electric Bike",
        price: 649.99,
        image: "https://m.media-amazon.com/images/I/71uO52DOMyL._AC_SL1500_.jpg",
        specs: {
            range: 40, // miles
            maxSpeed: 20, // mph
            weight: 50, // lbs
            batteryCapacity: 374, // Wh
            motorPower: 350, // W
            customerRating: 4.2 // out of 5
        },
        description: "The Ancheer Electric Mountain Bike combines a powerful 350W brushless motor with a premium suspension fork for a smooth and enjoyable ride. The removable 36V 10.4Ah lithium-ion battery ensures up to 40 miles of range on a single charge.",
        features: [
            "350W brushless motor",
            "36V 10.4Ah lithium-ion battery",
            "3 riding modes: pedal-assist, electric, and traditional",
            "Front suspension fork",
            "21-speed Shimano transmission system",
            "Dual disc brakes"
        ],
        link: "https://www.amazon.com/ANCHEER-Electric-Commuter-Removable-Suspension/dp/B07GND9RMQ"
    },
    {
        id: 2,
        name: "Heybike Cityscape Electric Bike",
        price: 699.99,
        image: "https://m.media-amazon.com/images/I/71jQUDdS6QL._AC_SL1500_.jpg",
        specs: {
            range: 40, // miles
            maxSpeed: 19, // mph
            weight: 58, // lbs
            batteryCapacity: 360, // Wh
            motorPower: 350, // W
            customerRating: 4.5 // out of 5
        },
        description: "The Heybike Cityscape is perfect for urban commuters. It features a 350W motor and a 36V 10Ah battery that delivers up to 40 miles per charge. The bike includes a comfortable step-through frame design that makes it easy to mount and dismount.",
        features: [
            "350W brushless gear motor",
            "36V 10Ah removable battery",
            "Step-through frame design",
            "3 riding modes",
            "7-speed Shimano gear system",
            "Front suspension and dual shock absorbers",
            "Integrated headlight and taillight"
        ],
        link: "https://www.amazon.com/Heybike-Cityscape-Electric-Commuter-Step-Thru/dp/B09NKZX7VY"
    },
    {
        id: 3,
        name: "Velowave Electric Mountain Bike",
        price: 1299.99,
        image: "https://m.media-amazon.com/images/I/81lm0iFJwdL._AC_SL1500_.jpg",
        specs: {
            range: 50, // miles
            maxSpeed: 28, // mph
            weight: 53, // lbs
            batteryCapacity: 614, // Wh
            motorPower: 750, // W
            customerRating: 4.6 // out of 5
        },
        description: "The Velowave Electric Mountain Bike is built for all terrains with its powerful 750W motor and 48V 12.8Ah battery. With a top speed of 28mph and a range of up to 50 miles, this bike is perfect for adventurous riders.",
        features: [
            "750W brushless motor",
            "48V 12.8Ah removable battery",
            "Hydraulic disc brakes",
            "27.5\" puncture-resistant tires",
            "Front suspension fork",
            "8-speed transmission",
            "LCD display with USB charging"
        ],
        link: "https://www.amazon.com/VELOWAVE-Electric-Mountain-Hydraulic-Suspension/dp/B09CZ34SN9"
    },
    {
        id: 4,
        name: "Lectric XP 2.0 Folding E-Bike",
        price: 999.00,
        image: "https://m.media-amazon.com/images/I/71-TeFZ0MtL._AC_SL1500_.jpg",
        specs: {
            range: 45, // miles
            maxSpeed: 28, // mph
            weight: 63, // lbs
            batteryCapacity: 460, // Wh
            motorPower: 500, // W
            customerRating: 4.8 // out of 5
        },
        description: "The Lectric XP 2.0 is a versatile folding electric bike that can handle both city streets and light trails. With a 500W motor that peaks at 850W and a range of up to 45 miles, this bike is compact yet powerful.",
        features: [
            "500W motor (850W peak)",
            "48V 9.6Ah battery",
            "20\" fat tires",
            "Foldable frame for easy storage",
            "Front suspension fork",
            "5 levels of pedal assist",
            "IP65 water resistance rating"
        ],
        link: "https://www.amazon.com/Lectric-eBikes-XP-Black-Position/dp/B09HLPDDT4"
    },
    {
        id: 5,
        name: "Ride1Up 700 Series Electric Bike",
        price: 1695.00,
        image: "https://m.media-amazon.com/images/I/71S-WfFzZsL._AC_SL1500_.jpg",
        specs: {
            range: 70, // miles
            maxSpeed: 28, // mph
            weight: 62, // lbs
            batteryCapacity: 720, // Wh
            motorPower: 750, // W
            customerRating: 4.7 // out of 5
        },
        description: "The Ride1Up 700 Series is a premium electric bike designed for urban commuting. It combines a powerful 750W motor with a large 48V 15Ah battery for exceptional range. The bike features a comfortable upright riding position and quality components throughout.",
        features: [
            "750W geared hub motor",
            "48V 15Ah Samsung/LG battery",
            "27.5\" puncture-resistant tires",
            "Hydraulic disc brakes",
            "Front suspension fork",
            "8-speed Shimano Acera drivetrain",
            "Integrated lights and included fenders and rack"
        ],
        link: "https://ride1up.com/product/700-series/"
    },
    {
        id: 6,
        name: "Nakto 26\" Electric Cruiser Bike",
        price: 699.99,
        image: "https://m.media-amazon.com/images/I/71WcA3JMUOL._AC_SL1500_.jpg",
        specs: {
            range: 25, // miles
            maxSpeed: 20, // mph
            weight: 68, // lbs
            batteryCapacity: 360, // Wh
            motorPower: 300, // W
            customerRating: 4.3 // out of 5
        },
        description: "The Nakto Electric Cruiser Bike is a budget-friendly option with a vintage design. It features a 300W motor and a 36V 10Ah battery providing a range of up to 25 miles. This bike is perfect for casual riders looking for comfort and style.",
        features: [
            "300W brushless motor",
            "36V 10Ah lithium battery",
            "6-speed Shimano gears",
            "Front basket and rear rack",
            "Front V-brake and rear expansion brake",
            "High-strength carbon steel frame",
            "Twist throttle and pedal assist modes"
        ],
        link: "https://www.amazon.com/NAKTO-Electric-Sporting-Shimano-Removable/dp/B07PLHBQNK"
    },
    {
        id: 7,
        name: "RadRover 6 Plus Electric Fat Bike",
        price: 1999.00,
        image: "https://m.media-amazon.com/images/I/81SWfU9ZqML._AC_SL1500_.jpg",
        specs: {
            range: 45, // miles
            maxSpeed: 20, // mph
            weight: 73, // lbs
            batteryCapacity: 672, // Wh
            motorPower: 750, // W
            customerRating: 4.9 // out of 5
        },
        description: "The RadRover 6 Plus is a premium fat tire electric bike with incredible all-terrain capabilities. Featuring a powerful 750W motor and a 48V 14Ah battery, this bike can handle sand, snow, and rough trails with ease.",
        features: [
            "750W geared hub motor",
            "48V 14Ah lithium-ion battery",
            "26\" x 4\" fat tires",
            "Hydraulic disc brakes",
            "RST spring suspension fork",
            "7-speed Shimano drivetrain",
            "Integrated headlight and taillight"
        ],
        link: "https://www.radpowerbikes.com/products/radrover-plus-electric-fat-tire-bike"
    },
    {
        id: 8,
        name: "Aventon Pace 500 Step-Through",
        price: 1499.00,
        image: "https://m.media-amazon.com/images/I/61CFH2QhGHL._AC_SL1200_.jpg",
        specs: {
            range: 40, // miles
            maxSpeed: 28, // mph
            weight: 52, // lbs
            batteryCapacity: 557, // Wh
            motorPower: 500, // W
            customerRating: 4.7 // out of 5
        },
        description: "The Aventon Pace 500 Step-Through is a class 3 e-bike designed for comfortable and fast commuting. With a 500W motor and a top speed of 28mph, this bike combines speed with accessibility through its step-through frame design.",
        features: [
            "500W brushless rear hub motor",
            "48V 11.6Ah removable battery",
            "27.5\" tires",
            "Hydraulic disc brakes",
            "8-speed Shimano gear system",
            "Integrated lights",
            "LCD display with companion app"
        ],
        link: "https://www.aventon.com/products/aventon-pace-500-step-through-ebike"
    },
    {
        id: 9,
        name: "Himiway Cruiser Electric Bike",
        price: 1599.00,
        image: "https://m.media-amazon.com/images/I/71JkFJ9YmPL._AC_SL1500_.jpg",
        specs: {
            range: 60, // miles
            maxSpeed: 22, // mph
            weight: 72, // lbs
            batteryCapacity: 840, // Wh
            motorPower: 750, // W
            customerRating: 4.6 // out of 5
        },
        description: "The Himiway Cruiser is a powerful all-terrain electric bike with an impressive 60-mile range. Its 750W motor and large 48V 17.5Ah battery make it ideal for long rides on various terrains, while the fat tires provide stability and comfort.",
        features: [
            "750W brushless gear motor",
            "48V 17.5Ah Samsung/LG battery",
            "26\" x 4\" fat tires",
            "Mechanical disc brakes",
            "Front suspension fork",
            "7-speed Shimano transmission",
            "Integrated lights and kickstand"
        ],
        link: "https://himiwaybike.com/products/himiway-fat-tire-electric-bike"
    },
    {
        id: 10,
        name: "Propella SS Single-Speed Electric Bike",
        price: 999.00,
        image: "https://m.media-amazon.com/images/I/61ROn53wQ-L._AC_SL1000_.jpg",
        specs: {
            range: 35, // miles
            maxSpeed: 18, // mph
            weight: 35, // lbs
            batteryCapacity: 250, // Wh
            motorPower: 250, // W
            customerRating: 4.5 // out of 5
        },
        description: "The Propella SS is a lightweight, minimalist electric bike that's perfect for urban commuting. At just 35 pounds, it's one of the lightest e-bikes available, while still offering a 250W motor and a range of up to 35 miles.",
        features: [
            "250W rear hub motor",
            "36V 7Ah Samsung battery",
            "700c x 35mm tires",
            "Mechanical disc brakes",
            "Single-speed drivetrain",
            "5 levels of pedal assist",
            "Minimalist design with blue accents"
        ],
        link: "https://propella.bike/products/ss"
    },
    {
        id: 11,
        name: "5TH WHEEL Penguin Electric Bike",
        price: 499.99,
        image: "https://a.media-amazon.com/images/I/71qHzTpPovL._AC_SL1500_.jpg",
        specs: {
            range: 40, // miles
            maxSpeed: 20, // mph
            weight: 48, // lbs
            batteryCapacity: 374.7, // Wh
            motorPower: 700, // W
            customerRating: 4.3 // out of 5
        },
        description: "DemoDescription",
        features: [
            "demo features",
        ],
        link: "https://amzn.to/4lVt0r3"
    },
];

// Normalize the specs values for fair comparison
// Each spec is normalized to a value between 0 and 1
function normalizeSpecs() {
    // Find min and max values for each spec
    const minMax = {
        range: { min: Infinity, max: -Infinity },
        maxSpeed: { min: Infinity, max: -Infinity },
        weight: { min: Infinity, max: -Infinity }, // Lower is better for weight
        batteryCapacity: { min: Infinity, max: -Infinity },
        motorPower: { min: Infinity, max: -Infinity },
        customerRating: { min: Infinity, max: -Infinity }
    };
    
    ebikes.forEach(bike => {
        for (const spec in bike.specs) {
            if (spec === 'weight') continue; // Handle weight separately
            
            minMax[spec].min = Math.min(minMax[spec].min, bike.specs[spec]);
            minMax[spec].max = Math.max(minMax[spec].max, bike.specs[spec]);
        }
        
        // For weight, we track min and max, but will invert when normalizing
        minMax.weight.min = Math.min(minMax.weight.min, bike.specs.weight);
        minMax.weight.max = Math.max(minMax.weight.max, bike.specs.weight);
    });
    
    // Normalize each bike's specs
    ebikes.forEach(bike => {
        bike.normalizedSpecs = {};
        
        for (const spec in bike.specs) {
            if (spec === 'weight') {
                // Invert weight (lighter is better)
                bike.normalizedSpecs[spec] = (minMax[spec].max - bike.specs[spec]) / (minMax[spec].max - minMax[spec].min);
            } else {
                bike.normalizedSpecs[spec] = (bike.specs[spec] - minMax[spec].min) / (minMax[spec].max - minMax[spec].min);
            }
        }
    });
}

// Call the normalization function
normalizeSpecs(); 