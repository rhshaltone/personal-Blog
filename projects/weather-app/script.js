class WeatherApp {
    constructor() {
        // Using OpenWeatherMap API - you'll need to get a free API key from https://openweathermap.org/api
        this.API_KEY = 'demo_key'; // Replace with your actual API key
        this.API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        
        this.initializeElements();
        this.bindEvents();
        this.loadDefaultWeather();
    }
    
    initializeElements() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loading = document.getElementById('loading');
        this.weatherCard = document.getElementById('weatherCard');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Weather display elements
        this.cityName = document.getElementById('cityName');
        this.currentDate = document.getElementById('currentDate');
        this.temp = document.getElementById('temp');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.description = document.getElementById('description');
        this.visibility = document.getElementById('visibility');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.feelsLike = document.getElementById('feelsLike');
    }
    
    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.searchWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
    }
    
    async loadDefaultWeather() {
        // Try to get user's location, fallback to a default city
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.fetchWeatherByCoords(latitude, longitude);
                },
                () => {
                    // Fallback to default city
                    this.fetchWeather('Nairobi');
                }
            );
        } else {
            this.fetchWeather('Nairobi');
        }
    }
    
    async searchWeather() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        await this.fetchWeather(city);
    }
    
    async fetchWeather(city) {
        this.showLoading(true);
        
        try {
            // For demo purposes, we'll use mock data since API key is not provided
            // In a real implementation, you would use the actual API
            if (this.API_KEY === 'demo_key') {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.displayMockWeather(city);
                return;
            }
            
            const url = `${this.API_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            this.displayWeather(data);
            
        } catch (error) {
            this.showError('City not found. Please check the spelling and try again.');
        } finally {
            this.showLoading(false);
        }
    }
    
    async fetchWeatherByCoords(lat, lon) {
        this.showLoading(true);
        
        try {
            if (this.API_KEY === 'demo_key') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.displayMockWeather('Your Location');
                return;
            }
            
            const url = `${this.API_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            
            const data = await response.json();
            this.displayWeather(data);
            
        } catch (error) {
            this.fetchWeather('Nairobi'); // Fallback
        } finally {
            this.showLoading(false);
        }
    }
    
    displayWeather(data) {
        // Update weather information
        this.cityName.textContent = `${data.name}, ${data.sys.country}`;
        this.currentDate.textContent = this.formatDate(new Date());
        this.temp.textContent = Math.round(data.main.temp);
        this.description.textContent = data.weather[0].description;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} m/s`;
        this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        
        // Update weather icon based on weather condition
        this.updateWeatherIcon(data.weather[0].main);
        
        this.showWeatherCard();
    }
    
    displayMockWeather(city) {
        // Mock weather data for demo
        const mockData = {
            name: city,
            country: 'Demo',
            temp: Math.floor(Math.random() * 20) + 15, // 15-35°C
            description: ['sunny', 'partly cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
            visibility: (Math.random() * 5 + 5).toFixed(1), // 5-10 km
            humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
            windSpeed: (Math.random() * 10 + 2).toFixed(1), // 2-12 m/s
            feelsLike: Math.floor(Math.random() * 22) + 13 // 13-35°C
        };
        
        this.cityName.textContent = `${mockData.name}`;
        this.currentDate.textContent = this.formatDate(new Date());
        this.temp.textContent = mockData.temp;
        this.description.textContent = mockData.description;
        this.visibility.textContent = `${mockData.visibility} km`;
        this.humidity.textContent = `${mockData.humidity}%`;
        this.windSpeed.textContent = `${mockData.windSpeed} m/s`;
        this.feelsLike.textContent = `${mockData.feelsLike}°C`;
        
        // Set icon based on description
        const iconMap = {
            'sunny': 'fas fa-sun',
            'partly cloudy': 'fas fa-cloud-sun',
            'cloudy': 'fas fa-cloud',
            'rainy': 'fas fa-cloud-rain'
        };
        this.weatherIcon.className = iconMap[mockData.description] || 'fas fa-sun';
        
        this.showWeatherCard();
    }
    
    updateWeatherIcon(weatherMain) {
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-drizzle',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Smoke': 'fas fa-smog',
            'Haze': 'fas fa-smog',
            'Dust': 'fas fa-smog',
            'Fog': 'fas fa-smog'
        };
        
        this.weatherIcon.className = iconMap[weatherMain] || 'fas fa-sun';
    }
    
    formatDate(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    showLoading(show) {
        this.loading.style.display = show ? 'block' : 'none';
        this.weatherCard.style.display = show ? 'none' : (this.weatherCard.style.display === 'block' ? 'block' : 'none');
        this.errorMessage.style.display = show ? 'none' : (this.errorMessage.style.display === 'block' ? 'block' : 'none');
    }
    
    showWeatherCard() {
        this.weatherCard.style.display = 'block';
        this.errorMessage.style.display = 'none';
        this.loading.style.display = 'none';
    }
    
    showError(message) {
        this.errorMessage.querySelector('p').textContent = message;
        this.errorMessage.style.display = 'block';
        this.weatherCard.style.display = 'none';
        this.loading.style.display = 'none';
    }
}

// Initialize the weather app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add enter key support for better UX
    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.focus();
    }
    
    // Add some example cities for quick testing
    const examples = ['London', 'Tokyo', 'New York', 'Paris', 'Sydney', 'Nairobi'];
    let exampleIndex = 0;
    
    // Cycle through example cities as placeholder
    setInterval(() => {
        if (cityInput && cityInput.value === '') {
            cityInput.placeholder = `Try "${examples[exampleIndex]}"...`;
            exampleIndex = (exampleIndex + 1) % examples.length;
        }
    }, 3000);
});
