# Electric Bike Decision Matrix - Development Guide

## Project Overview
This is a decision matrix tool for comparing electric bikes based on customizable criteria. The application pulls data from a Google Sheet and allows users to assign weights to different features.

## Development Setup

### Local Development
1. Navigate to the project directory:
   ```
   cd C:\Users\djseb\OneDrive\Desktop\ChromeExtensions\DMA$
   ```

2. Start a local server:
   ```
   python -m http.server
   ```

3. View the site at http://localhost:8000

### Making Changes

1. Make your desired changes to the HTML, CSS, or JavaScript files
2. Test locally using the Python server
3. When satisfied, commit and push your changes:
   ```
   git add .
   git commit -m "Description of your changes"
   git push origin master
   ```
4. GitHub Pages will automatically rebuild your site with the new changes

### Updating Google Sheet Data

1. Make changes to your Google Sheet
2. Ensure the sheet is still published to the web
3. The website will automatically use the updated data when users load the page

### Files Overview

- `index.html` - Main HTML structure of the application
- `css/styles.css` - Styling for the application
- `js/app.js` - Main application logic and initialization
- `js/data-fetcher.js` - Handles fetching and transforming data from Google Sheets
- `js/chart-utils.js` - Creates and manages data visualizations
- `js/sample-data.js` - Fallback data if Google Sheets can't be accessed

### GitHub Repository

- URL: https://github.com/djays1618/DMA
- Published site: https://djays1618.github.io/DMA/

## Troubleshooting

### CORS Issues
If you encounter CORS errors when fetching data from Google Sheets, check:
- The Google Sheet is properly published to the web
- The CORS proxy in `app.js` is functioning
- The fallback to sample data is working correctly

### GitHub Pages Not Updating
If your site isn't updating after pushing changes:
1. Check GitHub Pages settings in repository settings
2. Verify that you pushed to the correct branch (master)
3. Wait a few minutes as updates can take time to propagate

## Future Enhancement Ideas
- Add ability to filter bikes by price range
- Implement bike comparison side-by-side view
- Add more visualization options
- Include user reviews from external sources 