// Define an object named 'weather' to store weather-related functionality
let weather = {
    //Store the OpenWeatherApp API Key
    "apiKey": "af9f750bdb6713bae0e002433d462f2d",
    //Function to fetch weather data for a given city
    fetchWeather: function (city) {
        // Use the fetch API to make a GET request to the OpenWeatherMap API
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        // Once the response is received, parse it as JSON
        .then((response) => response.json())
        //Once the data is parsed, call the displayWeather function with the received data
        .then((data) => this.displayWeather(data) );
    },
    // Function to display weather data on the webpage
    displayWeather: function(data) {
        // Destructure the 'data' object to extract the required information
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        //Log the weather data to the console
        console.log(name,icon,description,temp,humidity,speed);

        // Update the webpage elements with the weather data
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed:" + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    }, 
    //Function to initiate a weather search when the user clicks the search button
    search: function()
    // Retrieve the value entered in the search bar and call fetchWeather with it
    {this.fetchWeather(document.querySelector(".search-bar").value);
},
};
//Add an event listener to the search button to trigger the weather search
document.querySelector(".search button").addEventListener("click", function(){
weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }});

weather.fetchWeather("Denver");

let forecast = {
    apiKey: "af9f750bdb6713bae0e002433d462f2d",
    fetchForecast: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then(response => response.json())
        .then(data => this.displayForecast(data));
    },
    displayForecast: function(data) {
        const forecastContainers = document.querySelectorAll('.future-forecast-container');

        // Clear any existing forecast elements in each container
        forecastContainers.forEach(container => {
            container.innerHTML = '';
        });

        const forecastList = data.list; // Access the list of forecasts

        // Loop through each forecast entry (typically every 3 hours)
        forecastList.forEach((forecastData, index) => {
            // For simplicity, let's display the forecast for every 24 hours
            if (index % 8 === 0) {
                const dateTime = forecastData.dt_txt;
                const date = new Date(dateTime);

                const day = date.toLocaleString('en-US', { weekday: 'long' });
                const icon = forecastData.weather[0].icon;
                const description = forecastData.weather[0].description;
                const temp = forecastData.main.temp;
                const humidity = forecastData.main.humidity;
                const speed = forecastData.wind.speed;

                // Determine which container to append the forecast to based on index
                let containerIndex = Math.floor(index / 8) + 1;
                if (containerIndex > 5) return; // Only display forecasts for up to 5 days

                // Create the forecast element
                const forecastElement = document.createElement('div');
                forecastElement.classList.add('today');
                forecastElement.innerHTML = `
                    <div class="day">${day}</div>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Condition" class="icon">
                    <div class="temp">${temp}°C</div>
                    <div class="wind">Wind Speed: ${speed} km/h</div>
                    <div class="humidity">Humidity: ${humidity}%</div>
                `;

                // Append the forecast element to the corresponding container
                const containerSelector = `.future-forecast-container-${containerIndex}`;
                const container = document.querySelector(containerSelector);
                container.appendChild(forecastElement);
            }
        });
    },
    search: function() {
        const city = document.querySelector(".search-bar").value;
        this.fetchForecast(city);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    forecast.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        forecast.search();
    }
});

forecast.fetchForecast("Denver");


// Write a local item
localStorage.setItem("myKey", "myValue");

// Read a local item
var theItemValue = localStorage.getItem("myKey");

// Check for changes in the local item and log them
window.addEventListener('storage', function(event) {
    console.log('The value for ' + event.key + ' was changed from' + event.oldValue + ' to ' + event.newValue);
}, false);

// Check for HTML5 Storage
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
