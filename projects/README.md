# Personal Blog Projects

This directory contains the completed projects for Shal Rhimba's personal blog.

## 🌦️ Weather App

**Location**: `weather-app/`

A modern, responsive weather application that provides real-time weather information for any city.

### Features:
- **Live Weather Data**: Displays current weather conditions
- **Location-based**: Automatically detects user location
- **Clean UI**: Modern design with smooth animations
- **Responsive**: Works on all device sizes
- **Interactive**: Search functionality and intuitive interface

### Technologies Used:
- HTML5
- CSS3 (with modern features like backdrop-filter)
- Vanilla JavaScript (ES6+ classes)
- OpenWeatherMap API integration (ready for API key)

### Setup:
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace `'demo_key'` in `script.js` with your actual API key
3. Open `index.html` in a web browser

**Note**: The app currently uses mock data for demonstration. To use real weather data, update the API key in the JavaScript file.

---

## 🌍 Environment Gallery

**Location**: `environment-gallery/`

A dynamic photo gallery showcasing environmental awareness through stunning nature photography.

### Features:
- **Dynamic Filtering**: Sort images by category (Forests, Oceans, Mountains, Wildlife, Conservation)
- **Lightbox Viewer**: Full-screen image viewing with navigation
- **Responsive Design**: Adapts to all screen sizes
- **Interactive Stats**: Environmental awareness statistics
- **Smooth Animations**: Enhanced user experience with transitions

### Technologies Used:
- HTML5 with semantic markup
- CSS3 (Grid, Flexbox, modern animations)
- Vanilla JavaScript (ES6+ classes)
- Unsplash API for high-quality images
- Intersection Observer for performance

### Features in Detail:
- **Category Filtering**: All, Forests, Oceans, Mountains, Wildlife, Conservation
- **Keyboard Navigation**: Arrow keys and Escape key support in lightbox
- **Lazy Loading**: Images load as they come into view
- **Environmental Stats**: Real facts about environmental issues
- **Mobile Optimized**: Touch-friendly interface

---

## 🚀 How to Access Projects

1. **From the main blog**: Navigate to the Projects page and click on the project cards
2. **Direct access**: 
   - Weather App: Open `weather-app/index.html`
   - Environment Gallery: Open `environment-gallery/index.html`

## 🛠️ Project Structure

```
projects/
├── weather-app/
│   ├── index.html          # Main weather app page
│   ├── style.css           # Weather app styles
│   └── script.js           # Weather app functionality
├── environment-gallery/
│   ├── index.html          # Gallery main page
│   ├── style.css           # Gallery styles
│   └── script.js           # Gallery functionality
└── README.md               # This file
```

## 🔧 Customization

### Weather App:
- **API Key**: Replace `'demo_key'` in `script.js` with your OpenWeatherMap API key
- **Default City**: Change the fallback city in the `loadDefaultWeather()` function
- **Colors**: Modify the CSS gradient colors in `style.css`

### Environment Gallery:
- **Images**: Replace Unsplash URLs with your own image URLs
- **Categories**: Add new filter categories in both HTML and JavaScript
- **Stats**: Update environmental statistics in the HTML

## 🌐 Browser Compatibility

Both projects are built with modern web standards and work in:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile Responsive

Both projects are fully responsive and provide excellent user experience on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen orientations

## 🎯 Performance Features

- **Lazy Loading**: Images load only when needed
- **Intersection Observer**: Smooth scroll animations
- **Optimized Images**: Properly sized images for web
- **Modern CSS**: Hardware-accelerated animations
- **Minimal JavaScript**: No external libraries required

---

**Built with ❤️ by Shal Rhimba**  
*Contributing to environmental awareness through technology*
