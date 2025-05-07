// Sample data to use as a fallback if the Google Sheet can't be loaded
const SAMPLE_BIKES = [
    {
        id: 1,
        name: "Rad Power RadCity",
        model: "RadCity",
        brand: "Rad Power",
        price: 1599,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "The Rad Power RadCity is a versatile electric bike featuring a powerful 750W motor and a 672 Wh battery capacity. It offers up to 45 miles of electric range with a top speed of 20 MPH. Equipped with 26\" tires and front suspension for improved handling.",
        specs: {
            batteryPower: 672,
            rangeElectric: 45,
            topSpeed: 20,
            breaks: "Hydraulic disc",
            suspension: "front",
            rating: "4.7",
            popularity: 1
        },
        normalizedSpecs: {
            batteryPower: 0.8,
            rangeElectric: 0.9,
            topSpeed: 0.7,
            breaks: 1.0,
            suspension: 0.5,
            rating: 0.94,
            popularity: 0.2,
            price: 0.6
        },
        link: "https://www.amazon.com",
        features: [
            "672 Wh battery capacity",
            "45 mile electric range",
            "20 mph top speed",
            "Hydraulic disc braking system",
            "Front suspension",
            "Integrated lights",
            "Rear rack"
        ]
    },
    {
        id: 2,
        name: "Aventon Pace 500",
        model: "Pace 500",
        brand: "Aventon",
        price: 1399,
        image: "https://images.unsplash.com/photo-1571111387055-ec858f99bafd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "The Aventon Pace 500 is a versatile electric bike featuring a powerful 500W motor and a 556 Wh battery capacity. It offers up to 40 miles of electric range with a top speed of 28 MPH. Equipped with 27.5\" tires.",
        specs: {
            batteryPower: 556,
            rangeElectric: 40,
            topSpeed: 28,
            breaks: "Hydraulic disc",
            suspension: "none",
            rating: "4.5",
            popularity: 3
        },
        normalizedSpecs: {
            batteryPower: 0.7,
            rangeElectric: 0.8,
            topSpeed: 1.0,
            breaks: 1.0,
            suspension: 0.0,
            rating: 0.9,
            popularity: 0.7,
            price: 0.7
        },
        link: "https://www.amazon.com",
        features: [
            "556 Wh battery capacity",
            "40 mile electric range",
            "28 mph top speed",
            "Hydraulic disc braking system",
            "Integrated lights",
            "Lightweight frame"
        ]
    },
    {
        id: 3,
        name: "Lectric XP 2.0",
        model: "XP 2.0",
        brand: "Lectric",
        price: 999,
        image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "The Lectric XP 2.0 is a versatile electric bike featuring a powerful 500W motor and a 460 Wh battery capacity. It offers up to 45 miles of electric range with a top speed of 20 MPH. Equipped with 20\" fat tires for all-terrain riding.",
        specs: {
            batteryPower: 460,
            rangeElectric: 45,
            topSpeed: 20,
            breaks: "Mechanical disc",
            suspension: "front",
            rating: "4.8",
            popularity: 2
        },
        normalizedSpecs: {
            batteryPower: 0.6,
            rangeElectric: 0.9,
            topSpeed: 0.7,
            breaks: 0.7,
            suspension: 0.5,
            rating: 0.96,
            popularity: 0.5,
            price: 1.0
        },
        link: "https://www.amazon.com",
        features: [
            "460 Wh battery capacity",
            "45 mile electric range",
            "20 mph top speed",
            "Mechanical disc braking system",
            "Front suspension",
            "Folding frame",
            "Fat tires for all terrain"
        ]
    }
];

// Function to get sample data
function getSampleData() {
    return {
        products: SAMPLE_BIKES
    };
} 