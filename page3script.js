
window.onload = function() {
    fetchWeatherForLocations(); // Hent værdata for alle stedene automatisk
};
//Oppdaterer værdataen hvert minutt
setInterval(fetchWeatherForLocations, 60000);

    const locations = [
        {location: "Oslo", lat: 59.9127, long: 10.7461},
        {location: "Bergen", lat: 60.393, long: 5.3242},
        {location: "Stavanger", lat: 58.9701, long: 5.7333},
        {location: "Trondheim", lat: 63.4305, long: 10.3951},
        {location: "Tromsø", lat: 69.6489, long: 18.9551},
        {location: "Bodø", lat: 67.28, long: 14.405},
        {location: "Kristiansand", lat: 58.1467, long: 7.9956},
        {location: "Ålesund", lat: 62.4723, long: 6.1549},
        {location: "Haugesund", lat: 59.4138, long: 5.268}
    ];

//Henter værdata for en lokasjon fra api
    function fetchWeather(location) {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.long}&current_weather=true`)
            .then(response => response.json())
            .then(data => {
                displayWeather(location, data.current_weather);
            })
            .catch(error => {
                console.error(`Kunne ikke hente værdata for ${location.location}:`, error);
            });
    }

function fetchWeatherForLocations() {
    const weatherContainer = document.getElementById('vaer-container');
    weatherContainer.innerHTML = ''; // Tøm containeren før oppdatering

    locations.forEach(location => {
        fetchWeather(location); // Henter værdata for hvert sted
    });
}
    function displayWeather(location, weatherData) {
        const weatherContainer = document.getElementById('vaer-container');
        const {temperature, windspeed} = weatherData;

        weatherContainer.innerHTML += `
        <div class="weather-card">
            <h3>${location.location}</h3>
            <p>Temperatur: ${temperature}°C</p>
            <p>Vindhastighet: ${windspeed} km/h</p>
        </div>
    `;
    }




