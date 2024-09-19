document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'Your OpenWeatherMap API key'; 
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found');
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weatherDetails').innerHTML = `<p>No search results found for "${city}".</p>`;
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            if (error.message === 'City not found') {
                document.getElementById('weatherDetails').innerHTML = `<p>No search results found for "${city}".</p>`;
            } else {
                document.getElementById('weatherDetails').innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
            }
            console.error('Error fetching weather data:', error);
        });
});

function displayWeather(data) {
    const weatherDetails = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherDetails').innerHTML = weatherDetails;
}
