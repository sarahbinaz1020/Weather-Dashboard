// API key
var api_key = "9d38179a65e9f54de109850607e33f7f";

// declare all variables
// search city input
var inputEl = document.getElementById("city-text");
var searchEl = document.getElementById("searchBtn");
var clearEl = document.getElementById("clearBtn");
// current weather variables
var cityNameEl = document.getElementById("city-name");
var currentDateEl = document.getElementById("currentDate");
var forecastDateEl = document.getElementById("forecastDate");
var currentPicEl = document.getElementById("current-pic");
var tempEl = document.getElementById("temperature");
var humidityEl = document.getElementById("humidity");
var windSpeedEl = document.getElementById("wind-speed");
var uvIndexEl = document.getElementById("UV-index");
// forecast days
var forecastDate1El = document.getElementById("forecastDate1");
var forecastIcon1El = document.getElementById("forecast-pic1");
var forecastTemp1El = document.getElementById("forecastTemp1");
var forecastHumidity1El = document.getElementById("forecastHumidity1");

var forecastDate2El = document.getElementById("forecastDate2");
var forecastIcon2El = document.getElementById("forecast-pic2");
var forecastTemp2El = document.getElementById("forecastTemp2");
var forecastHumidity2El = document.getElementById("forecastHumidity2");

var forecastDate3El = document.getElementById("forecastDate3");
var forecastIcon3El = document.getElementById("forecast-pic3");
var forecastTemp3El = document.getElementById("forecastTemp3");
var forecastHumidity3El = document.getElementById("forecastHumidity3");

var forecastDate4El = document.getElementById("forecastDate4");
var forecastIcon4El = document.getElementById("forecast-pic4");
var forecastTemp4El = document.getElementById("forecastTemp4");
var forecastHumidity4El = document.getElementById("forecastHumidity4");

var forecastDate5El = document.getElementById("forecastDate5");
var forecastIcon5El = document.getElementById("forecast-pic5");
var forecastTemp5El = document.getElementById("forecastTemp5");
var forecastHumidity5El = document.getElementById("forecastHumidity5");

// recently searched cities
var historyEl = document.getElementById("history");
var searchHistoryEl = JSON.parse(localStorage.getItem("#search")) || [];

// current weather for that city
function getWeather(cityName) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
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

  // DISPLAY CURRENT WEATHER
  function displayWeather(currentWeather) {
    var weatherContainerEl = document.querySelector(".weather-container");

    // get current date
    const currentDate = new Date(currentWeather.dt * 1000);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    currentDateEl.innerHTML =
      currentWeather.name + " - " + month + "/" + day + "/" + year + " ";
    let weatherPic = currentWeather.weather[0].icon;
    currentPicEl.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
    );
    currentPicEl.setAttribute("alt", currentWeather.weather[0].description);

    // convert temp from Kelvin to degrees
    var tempKelvin = currentWeather.main.temp;
    var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " ??F";
    tempEl.innerHTML = "Temperature: " + tempF;
    // humidity
    humidityEl.innerHTML = "Humidity: " + currentWeather.main.humidity + "%";

    // wind speed
    windSpeedEl.innerHTML = "Wind Speed: " + currentWeather.wind.speed + " MPH";

    // view the UV indexcolor that indicates whether the conditions are favorable, moderate, or severe
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
  }
}

// fetch 5 day forecast
function getForecastWeather(city) {
  var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
  fetch(forecastWeatherUrl)
    .then((data) => data.json())
    .then(function (forecastWeather) {
      if (forecastWeather.cod === "404") {
        alert("city not found");
        return;
      }
      displayForecastWeather(forecastWeather);
    });
  // view future weather conditions for that city-a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  function displayForecastWeather(forecastWeather) {
    var forecastWeatherContainerEl = document.querySelectorAll(".forecast");

    // FORECAST SECTION -- DAY 1
    // Date
    var forecastDate = new Date(forecastWeather.list[7].dt * 1000);
    var forecastDay = forecastDate.getDate();
    var forecastMonth = forecastDate.getMonth() + 1;
    var forecastYear = forecastDate.getFullYear();
    forecastDate1El.innerHTML =
      forecastMonth + "/" + forecastDay + "/" + forecastYear;
    // Icon
    var weatherPic = forecastWeather.list[4].weather[0].icon;
    forecastIcon1El.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
    );
    forecastIcon1El.setAttribute(
      "alt",
      forecastWeather.list[4].weather[0].description
    );

    //  Temp
    var tempKelvin = forecastWeather.list[7].main.temp_max;
    var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
    forecastTemp1El.innerHTML = "Temperature: " + tempF;
    // Humidity
    forecastHumidity1El.innerHTML =
      "Humidity: " + forecastWeather.list[7].main.humidity + "%";

    // DAY 2
    var forecastDate2 = new Date(forecastWeather.list[15].dt * 1000);
    var forecastDay2 = forecastDate2.getDate();
    var forecastMonth2 = forecastDate2.getMonth() + 1;
    var forecastYear2 = forecastDate2.getFullYear();
    forecastDate2El.innerHTML =
      forecastMonth2 + "/" + forecastDay2 + "/" + forecastYear2;

    // Icon
    var weatherPic2 = forecastWeather.list[15].weather[0].icon;
    forecastIcon2El.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic2 + "@2x.png"
    );
    forecastIcon2El.setAttribute(
      "alt",
      forecastWeather.list[15].weather[0].description
    );
    //  Temp
    var tempKelvin = forecastWeather.list[15].main.temp_max;
    var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
    forecastTemp2El.innerHTML = "Temperature: " + tempF;
    // Humidity
    forecastHumidity2El.innerHTML =
      "Humidity: " + forecastWeather.list[15].main.humidity + "%";

    // DAY 3
    var forecastDate3 = new Date(forecastWeather.list[23].dt * 1000);
    var forecastDay3 = forecastDate3.getDate();
    var forecastMonth3 = forecastDate3.getMonth() + 1;
    var forecastYear3 = forecastDate3.getFullYear();
    forecastDate3El.innerHTML =
      forecastMonth3 + "/" + forecastDay3 + "/" + forecastYear3;

    // Icon
    var weatherPic3 = forecastWeather.list[23].weather[0].icon;
    forecastIcon3El.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic3 + "@2x.png"
    );
    forecastIcon3El.setAttribute(
      "alt",
      forecastWeather.list[23].weather[0].description
    );
    //  Temp
    var tempKelvin = forecastWeather.list[23].main.temp_max;
    var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
    forecastTemp3El.innerHTML = "Temperature: " + tempF;
    // Humidity
    forecastHumidity3El.innerHTML =
      "Humidity: " + forecastWeather.list[23].main.humidity + "%";

    // DAY 4
    var forecastDate4 = new Date(forecastWeather.list[31].dt * 1000);
    var forecastDay4 = forecastDate4.getDate();
    var forecastMonth4 = forecastDate4.getMonth() + 1;
    var forecastYear4 = forecastDate4.getFullYear();
    forecastDate4El.innerHTML =
      forecastMonth4 + "/" + forecastDay4 + "/" + forecastYear4;

    // Icon
    var weatherPic4 = forecastWeather.list[31].weather[0].icon;
    forecastIcon4El.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic4 + "@2x.png"
    );
    forecastIcon4El.setAttribute(
      "alt",
      forecastWeather.list[31].weather[0].description
    );
    //  Temp
    var tempKelvin = forecastWeather.list[31].main.temp_max;
    var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
    forecastTemp4El.innerHTML = "Temperature: " + tempF;
    // Humidity
    forecastHumidity4El.innerHTML =
      "Humidity: " + forecastWeather.list[31].main.humidity + "%";

    // DAY 5
    var forecastDate5 = new Date(forecastWeather.list[39].dt * 1000);
    var forecastDay5 = forecastDate5.getDate();
    var forecastMonth5 = forecastDate5.getMonth() + 1;
    var forecastYear5 = forecastDate5.getFullYear();
    forecastDate5El.innerHTML =
      forecastMonth5 + "/" + forecastDay5 + "/" + forecastYear5;

    // Icon
    var weatherPic5 = forecastWeather.list[39].weather[0].icon;
    forecastIcon5El.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic5 + "@2x.png"
    );
    forecastIcon5El.setAttribute(
      "alt",
      forecastWeather.list[39].weather[0].description
    );
    //  Temp
    var tempKelvin = forecastWeather.list[39].main.temp_max;
    var tempF = Math.floor(1.8 * (tempKelvin - 273.15) + 32) + " degrees";
    forecastTemp5El.innerHTML = "Temperature: " + tempF;
    // Humidity
    forecastHumidity5El.innerHTML =
      "Humidity: " + forecastWeather.list[31].main.humidity + "%";
  }
}

// search button
searchEl.addEventListener("click", function (e) {
  e.preventDefault();
  var searchName = inputEl.value;
  getWeather(searchName);
  getForecastWeather(searchName);
  searchHistoryEl.push(searchName);
  localStorage.setItem("search", JSON.stringify(searchHistoryEl));
  renderSearchHistoryEl();
});

// clear button
clearEl.addEventListener("click", function (e) {
  e.preventDefault();
  searchHistoryEl = [];
  renderSearchHistoryEl();
});

// saved searches section
function renderSearchHistoryEl() {
  historyEl.innerHTML = "";
  for (let i = 0; i < searchHistoryEl.length; i++) {
    const historyItem = document.createElement("input");
    historyItem.setAttribute("type", "text");
    historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistoryEl[i]);
    historyItem.addEventListener("click", function () {
      getWeather(historyItem.value);
    });
    historyEl.append(historyItem);
  }
}

renderSearchHistoryEl();
if (searchHistoryEl.length > 0) {
  getWeather(searchHistoryEl[searchHistoryEl.length - 1]);
}
