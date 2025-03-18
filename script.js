document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

function fetchWeatherData(location) {
    fetchWeatherDataByCity(location);
}


document.addEventListener('DOMContentLoaded', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherDataByCoords(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location. Please enter a location manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please enter a location manually.');
    }
});

function fetchWeatherDataByCity(city) {
    const apiKey = 'e2c6e0cf66fc9622e59786c24ac8b0db'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherDataByCoords(lat, lon) {
    const apiKey = 'e2c6e0cf66fc9622e59786c24ac8b0db'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        const { main, weather, wind, rain, name } = data;
        const weatherIcon = getWeatherIcon(weather[0].main);
        const rainChance = rain ? `${rain['1h']} mm` : 'No rain';

        weatherInfoDiv.innerHTML = `
            <h2>Weather in ${name} ${weatherIcon}</h2>
            <p>🌡️ Temperature: ${main.temp}°C</p>
            <p>🌤️ Condition: ${weather[0].description}</p>
            <p>💧 Humidity: ${main.humidity}%</p>
            <p>💨 Wind Speed: ${wind.speed} m/s</p>
            <p>🌧️ Rain: ${rainChance}</p>
        `;

        updateBackground(weather[0].main, new Date().getHours());
    } else {
        weatherInfoDiv.innerHTML = `<p>Error: ${data.message}</p>`;
    }
}

function getWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case 'clear':
            return '☀️';
        case 'clouds':
            return '☁️';
        case 'rain':
            return '🌧️';
        case 'drizzle':
            return '🌦️';
        case 'thunderstorm':
            return '⛈️';
        case 'snow':
            return '❄️';
        case 'mist':
        case 'fog':
            return '🌫️';
        default:
            return '🌈';
    }
}

function updateBackground(condition, hour) {
    const body = document.body;
    let backgroundImage = '';

    if (hour >= 6 && hour < 18) {
        switch (condition.toLowerCase()) {
            case 'clear':
                backgroundImage = 'url("images/day-clear.jpg")';
                break;
            case 'clouds':
                backgroundImage = 'url("images/day-clouds.jpg")';
                break;
            case 'rain':
            case 'drizzle':
                backgroundImage = 'url("images/day-rain.jpg")';
                break;
            case 'thunderstorm':
                backgroundImage = 'url("images/day-thunderstorm.jpg")';
                break;
            case 'snow':
                backgroundImage = 'url("images/day-snow.jpg")';
                break;
            case 'mist':
            case 'fog':
                backgroundImage = 'url("images/day-fog.jpg")';
                break;
            default:
                backgroundImage = 'url("images/day-default.jpg")';
        }
    } else {
        switch (condition.toLowerCase()) {
            case 'clear':
                backgroundImage = 'url("images/night-clear.jpg")';
                break;
            case 'clouds':
                backgroundImage = 'url("images/night-clouds.jpg")';
                break;
            case 'rain':
            case 'drizzle':
                backgroundImage = 'url("images/night-rain.jpg")';
                break;
            case 'thunderstorm':
                backgroundImage = 'url("images/night-thunderstorm.jpg")';
                break;
            case 'snow':
                backgroundImage = 'url("images/night-snow.jpg")';
                break;
            case 'mist':
            case 'fog':
                backgroundImage = 'url("images/night-fog.jpg")';
                break;
            default:
                backgroundImage = 'url("images/night-default.jpg")';
        }
    }

    body.style.backgroundImage = backgroundImage;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.transition = 'background-image 1s ease-in-out';
}
