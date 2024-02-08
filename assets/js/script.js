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
    //Store the OpenWeatherApp API Key
        "apiKey": "af9f750bdb6713bae0e002433d462f2d",
        //Function to fetch weather data for a given city
        fetchForecast: function (city) {
            // Use the fetch API to make a GET request to the OpenWeatherMap API
            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + this.apiKey)
            // Once the response is received, parse it as JSON
            .then((response) => response.json())
            //Once the data is parsed, call the displayWeather function with the received data
            .then((data) => this.displayForecast(data) );
        },
        // Function to display weather data on the webpage
        displayForecast: function(data) {
            // Destructure the 'data' object to extract the required information
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            //Log the weather data to the console
            console.log(name,icon,description,temp,humidity,speed);

            // Update the webpage elements with the weather data
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
        {this.fetchForecast(document.querySelector(".search-bar").value);
    },
};

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