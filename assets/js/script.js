// var city = 'new york city';
// var weatherURL= 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=af9f750bdb6713bae0e002433d462f2d&units=imperial';

// fetch(weatherURL) 
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data)
//     })

    let weather = {
        "apiKey": "af9f750bdb6713bae0e002433d462f2d",
        fetchWeather: function () {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey).then((response) => response.json())
            .then((data) => console.log(data) );
        },
        displayWeather: function(data) {
            const { name } = data;
            const { icon, description } = data.weather;
        }
    }

