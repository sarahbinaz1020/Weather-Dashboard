var api_key = "9d38179a65e9f54de109850607e33f7f";

// global variables for current temp
var currentTempEl = document.querySelector("#city");

var currentDateEl = document.querySelector("date");

var currentTempEl = document.querySelector("#current-temp");

var currentHumidityEl = document.querySelector("#current-humidity");

var currentWindEl = document.querySelector("#current-wind-speed");

var currentUvEl = document.querySelector("#current-uv-index");


// search for a city
// current and future conditions for that city
function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      var tempKelvin = weather.main.temp
      var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees"
      
      currentTempEl.innerHTML = "Temperature: " + tempF ;
      // currentHumidityEl.innerHTML = "Humidity: " + weather.main.humidity + "%";
      // currentWindEl.innerHTML = "Wind Speed: " + weather.wind.speed + " MPH";
      if (weather.cod === "404") {
        alert("city not found");
        return;
      }

      // get lat & long for city
      var lon = weather.coord.lon;
      var lat = weather.coord.lat;
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&exclude=minutely,hourly`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (oneCallData) {
          // currentUvEl.innerHTML = "UV Index: " + oneCallData.current.uvi;
         
          // }
          console.log(oneCallData);
        });
    });
}
getWeather ("Tucson");

// if city called above, pull .notation to page

  // document.getElementById("currentDay").innerHTML = date;

  // and that city is added to the search history
// view current weather conditions for that city-city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// view the UV indexcolor that indicates whether the conditions are favorable, moderate, or severe
// view future weather conditions for that city-a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// click on a city in the search history-presented with current and future conditions for that city