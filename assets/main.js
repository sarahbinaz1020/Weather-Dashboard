// API key
var api_key = "9d38179a65e9f54de109850607e33f7f";

// declare all variables
// search city input
var searchEl = document.getElementById("searchBtn");
var clearEl = document.getElementById("clearBtn");
// current weather variables
var cityNameEl = document.getElementById("city-name");
var currentDateEl = document.getElementById("currentDate");
var tempEl = document.getElementById("temperature");
var humidityEl = document.getElementById("humidity");
var windSpeedEl = document.getElementById("wind-speed");
var uvIndexEl = document.getElementById("UV-index");
// recently searched cities
var historyEl = document.getElementById("history");
var searchHistoryEl = JSON.parse(localStorage.getItem("#search")) || [];

// search for a city
// var city = [];
var city = "Phoenix";

// current weather for that city
function getWeather() {
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

      // get lat & long for city to grab UVI
      var lon = weather.coord.lon;
      var lat = weather.coord.lat;
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&exclude=minutely,hourly`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (oneCallData) {
          console.log(oneCallData);

          
          // display UV Index
          var weatherContainerEl = document.querySelector("#UV-index");
          uvIndexEl.innerHTML = "UV Index: " + oneCallData.current.uvi;
          // UV Index button
          var uvEl = document.createElement("button");
          var uvIndex = oneCallData.current.uvi;

          if (uvIndex <= 2) {
            uvEl.classList.add("favorable");
          } else if (uvIndex >= 5) {
            uvEl.classList.add("severe");
          } else {
            uvEl.classList.add("moderate");
          }
          weatherContainerEl.append(uvEl);
        });
    });

  // fetch 5 day forecast
  var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
  fetch(forecastWeatherUrl)
    .then((data) => data.json())
    .then(function (forecastWeather) {
      console.log(forecastWeather);
    });
}
getWeather();

function displayWeather(currentWeather) {
  var weatherContainerEl = document.querySelector("#weather-container");

  // get current date
  const currentDate = new Date(currentWeather.dt * 1000);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  currentDateEl.innerHTML =
    currentWeather.name + " - " + month + "/" + day + "/" + year + " ";

  // convert temp from Kelvin to degrees
  var tempKelvin = currentWeather.main.temp;
  var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " °F";
  tempEl.innerHTML = "Temperature: " + tempF;
  // humidity
  humidityEl.innerHTML = "Humidity: " + currentWeather.main.humidity + "%";

  // wind speed
  windSpeedEl.innerHTML = "Wind Speed: " + currentWeather.wind.speed + " MPH";

  // UV Index button
  var mainCard = document.createElement("div");
  mainCard.classList.add("mainCard");
  var uvEl = document.createElement("button");
  if (uvIndexEl <= 2) {
    uvEl.classList.add("favorable");
  } else if (uvIndexEl >= 5) {
    uvEl.classList.add("severe");
  } else {
    uvEl.classList.add("moderate");
  }
  mainCard.append(uvEl);

  console.log(currentWeather);
}

// and that city is added to the search history

// view the UV indexcolor that indicates whether the conditions are favorable, moderate, or severe

// view future weather conditions for that city-a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

function displayForecastWeather(forecastWeather) {
  var forecastWeatherContainerEl = document.querySelector(
    "#forecast-weather-container"
  );
  var tempKelvin = forecastWeather.daily[0].temp.max;
  var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
  console.log(forecastWeatherContainerEl);

  // for loop to run through days, but is not working
  for (daily = 0; daily < 4; daily++) {
    forecastWeatherContainerEl.innerHTML = `<div id="date1">Date:${forecastWeather.daily[0].dt_txt}</div>
  <div id="temp1">Temp: ${tempF}</div>
  <div id="humidity1">Humidity: ${forecastWeather.daily[0].humidity}</div>`;
  }
}

// click on a city in the search history-presented with current and future conditions for that city

// // Pull the weather for local storage
$("#weather-container").each(function () {
  // Get elements by id
  const id = $(this).attr("id");

  // Retrive data from local storage
  var storedDescription = localStorage.getItem(id);

  $(this).children("textarea").val(storedDescription);
});
// click on button and log input to local storage
$("#searchBtn").on("click", function () {
  // create variable and DOM traverse to parent of save button to the id identifier
  var id = $(this).parent().attr("id");
  // get the value from the input area
  var description = $(this).siblings("textarea").val();
  // store value from input area into local storage
  localStorage.setItem(id, description);
});

// $("#searchBtn").on("click", function (event){
//   event.preventDefault();
//   console.log();
