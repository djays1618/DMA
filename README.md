# Electric Bike Decision Matrix

A web-based tool to help you find the perfect electric bike based on your personal preferences. This application allows you to select and weigh different criteria to evaluate electric bikes from Amazon, producing a personalized score for each bike.

![Electric Bike Decision Matrix](screenshot.png)

## Features

- **Customizable Criteria**: Toggle and adjust the importance of different electric bike specifications
- **Interactive Visualization**: View bikes on a scatter plot of score vs. price
- **Detailed Scoring**: See a breakdown of how each bike scores on individual criteria
- **Top Options**: Quickly identify the highest-scoring bikes
- **Value Ranking**: Sort bikes by value ratio (score per dollar)
- **Links to Products**: Direct links to Amazon for each bike

## Criteria Used

The decision matrix evaluates electric bikes based on these key factors:

- **Battery Capacity (Wh)**: Higher battery capacity means longer potential range
- **Range (miles)**: The maximum distance the bike can travel on a single charge
- **Top Speed (mph)**: Maximum speed the bike can achieve
- **Brakes Quality**: Hydraulic brakes (10/10) or disc brakes (7/10)
- **Suspension Quality**: Dual suspension (10/10), front/rear suspension (5/10), or none (0/10)
- **Popularity (Inverse)**: Less popular bikes score higher
- **Customer Rating**: Based on Amazon reviews

## How to Use

1. **Adjust Your Criteria**:
   - Use the toggle switches to include/exclude specific criteria
   - Slide the importance bars to weigh each criterion according to your preferences

2. **Calculate Results**:
   - Click the "Calculate Best Options" button to generate personalized scores

3. **Explore the Results**:
   - View the scatter plot showing score vs. price
   - See the top-scoring bikes at the top of the page
   - Browse the complete ranked list of bikes by value ratio
   - Click on any bike to view detailed specifications and scoring

## Setup Instructions

### Option 1: Quick Start (View Only)
Simply open the `index.html` file in your web browser to start using the application.

### Option 2: Local Development Server
For the best experience, especially when working with the Google Sheets data source, run the application using a local web server:

1. Install a simple web server like [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or use Python's built-in server:
   ```
   # Using Python 3
   python -m http.server
   
   # Using Python 2
   python -m SimpleHTTPServer
   ```

2. Access the application at `http://localhost:8000` (or whatever port your server uses)

## Google Sheets Integration

The application pulls electric bike data from a Google Sheet. To use your own data:

1. Create a copy of [this Google Sheet](https://docs.google.com/spreadsheets/d/1tIvJUpsIzu0cIG0tfvf3iPvEnJH-A8qLzd82TLGl8yk/edit?usp=sharing)
2. Fill in your own electric bike data following the existing structure
3. Publish your sheet to the web:
   - Go to File > Share > Publish to web
   - Select the sheet and CSV format
   - Copy the published URL
4. Update the `SHEET_URL` variable in `js/app.js` with your published URL

## Customization Options

### Adding New Criteria

1. Add the new criterion to the HTML in `index.html` following the existing pattern
2. Update the criteria list in `js/app.js`
3. Add the new criterion to the data extraction logic in `js/data-fetcher.js`

### Modifying the Scoring System

The scoring system can be customized in `js/data-fetcher.js`:

- Adjust the `normalizeSpecs` method to change how values are normalized
- Modify the specialized scoring methods like `scoreBreaks` or `scoreSuspension`
- Update `transformData` to handle new data types from your Google Sheet

### Styling Changes

The application's appearance is controlled by `css/styles.css`. Key sections are:

- Color scheme (in the `:root` CSS variables)
- Card layouts
- Chart appearance
- Modal styling
- Responsive design breakpoints

## Technical Details

This application is built using:

- Vanilla JavaScript (ES6+)
- Chart.js for data visualization
- CSV parsing for Google Sheets integration
- CSS Grid and Flexbox for responsive layouts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Electric bike data sourced from Amazon
- Built with Chart.js for data visualization
- Inspired by decision matrix analysis techniques 