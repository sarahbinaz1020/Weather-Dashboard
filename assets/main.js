var api_key = "9d38179a65e9f54de109850607e33f7f";

// search for a city

// $("#searchBtn").on("click", function (event){
//   event.preventDefault();
//   console.log();
// }
var cityTextEl = document.getElementById("#city-text");
var searchEl = document.getElementById("#searchBtn")
var clearEl = document.getElementById("#clearBtn")
var searchEl = document.getElementById("#searchBtn")
var searchEl = document.getElementById("#searchBtn")
var searchEl = document.getElementById("#searchBtn")


// current weatherfor that city
function getWeather(city) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      
      if (weather.cod === "404") {
        alert("city not found");
        return;
      }
      displayWeather(weather);
      // get lat & long for city
      var lon = weather.coord.lon;
      var lat = weather.coord.lat;
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&exclude=minutely,hourly`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (oneCallData) { 
          console.log(oneCallData);
        });
    });
    // fetch 5 day forecast
  var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
  fetch(forecastWeatherUrl)
    .then((data) => data.json())
    .then (function (forecastWeather){
      console.log(forecastWeather);
    })
}
getWeather ();

function displayWeather(currentWeather) {
  var weatherContainerEl = document.querySelector("#weather-container");
  // convert temp from Kelvin to degrees
  var tempKelvin = currentWeather.main.temp;
  var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
  
  // currentUvEl = current.uvi;

// view current weather conditions for that city name,  the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  weatherContainerEl.innerHTML = `<div id="city">City: ${currentWeather.name} </div>
  <div id="date"></div>
  <div id="current-temp">Temperature: ${tempF}</div>
  <div id="current-humidity">Humidity: ${currentWeather.main.humidity} %</div>
  <div id="current-wind-speed">Wind Speed: ${currentWeather.wind.speed}</div>
  <div id="current-uv-index">UV Index: </div>`
}

 // and that city is added to the search history

// view the UV indexcolor that indicates whether the conditions are favorable, moderate, or severe

// view future weather conditions for that city-a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity


function displayForecastWeather(forecastWeather){
  var forecastWeatherContainerEl = document.querySelector("#forecast-weather-container");
  var tempKelvin = forecastWeather.daily[0].temp.max;
  var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
 console.log(forecastWeatherContainerEl)

// for loop to run through days, but is not working
  for (daily=0; daily < 4; daily++) {
    forecastWeatherContainerEl.innerHTML = `<div id="date1">Date:${forecastWeather.daily[0].dt_txt}</div>
  <div id="temp1">Temp: ${tempF}</div>
  <div id="humidity1">Humidity: ${forecastWeather.daily[0].humidity}</div>`
  }

}

// click on a city in the search history-presented with current and future conditions for that city

// // Pull the weather for local storage
$("#weather-container").each(function() {
  // Get elements by id
  const id = $(this).attr("id");

  // Retrive data from local storage
  var storedDescription = localStorage.getItem(id);

  $(this).children("textarea").val(storedDescription);

})
// click on button and log input to local storage
$("#searchBtn").on("click", function () {
  // create variable and DOM traverse to parent of save button to the id identifier
  var id = $(this).parent().attr("id");
  // get the value from the input area
  var description = $(this).siblings("textarea").val();
  // store value from input area into local storage
  localStorage.setItem(id, description);
})