var apiKey = "06ea892937d25046c048ad52855ad9f6";
var cardContainer = document.querySelector("#card-container");
var forecastContainer = document.querySelector("#forecast-container");
var searchBtn = document.querySelector("#search-btn");
var cityText = document.querySelector("#city-text");
var stateText = document.querySelector("#state-text");
var recent = document.querySelector("#recent");

var recentSearches = JSON.parse(localStorage.getItem("recents")) || [];

function getLocation(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then((data) => data.json())
    .then(function (data) {
      // console.log(data);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      headName = data.name;
      // console.log(lon, lat);
      var newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      fetch(newUrl)
        .then((data) => data.json())
        .then(function (data) {
          // console.log(data.current.dt)
          // console.log(convert(data.current.dt));
          currentWeatherCard(data);
          forecastContainer.innerHTML = "";
          for (let i = 0; i < 5; i++) {
            item = data.daily[i];
            // console.log(item);
            forecastCard(item);
          }
        });
    });
}

function currentWeatherCard(item) {
  cardContainer.innerHTML = "";
  var newCard = document.createElement("div");
  var headNameH1 = document.createElement("h1");
  var ul = document.createElement("ul");
  var tempLi = document.createElement("li");
  var humidityLi = document.createElement("li");
  var windLi = document.createElement("li");
  var uvLi = document.createElement("li");
  var indexBtn = document.createElement("button");
  var iconImg = document.createElement("img");
  iconImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${item.current.weather[0].icon}@2x.png`
  );
  headNameH1.innerText = `${headName} ${convert(item.current.dt)}`;
  headNameH1.append(iconImg);
  tempLi.innerText = `Temperature: ${item.current.temp} °F`;
  humidityLi.innerText = `Humidity: ${item.current.humidity}%`;
  windLi.innerText = `Wind Speed: ${item.current.wind_speed} MPH`;
  uvLi.innerText = `UV Index: `;
  indexBtn.innerText = item.current.uvi;
  uvLi.append(indexBtn);
  if (item.current.uvi < 3) {
    indexBtn.classList = "btn-primary";
  } else if (item.current.uvi > 7) {
    indexBtn.classList = "btn-warning";
  } else {
    indexBtn.classList = "btn-danger";
  }
  ul.classList = "list-group";
  tempLi.classList = "list-group-item";
  humidityLi.classList = "list-group-item";
  windLi.classList = "list-group-item";
  uvLi.classList = "list-group-item";

  ul.append(tempLi, humidityLi, windLi, uvLi);
  newCard.append(headNameH1);
  newCard.append(ul);
  cardContainer.append(newCard);
}

function forecastCard(data) {
  var newCard = document.createElement("div");
  var headH3 = document.createElement("h3");
  var ul = document.createElement("ul");
  var tempLi = document.createElement("li");
  var humidityLi = document.createElement("li");
  var iconImg = document.createElement("img");
  iconImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
  );

  headH3.innerText = `${convert(data.dt)}`;
  tempLi.innerText = `Temperature: ${data.temp.day} °F`;
  humidityLi.innerText = `Humidity: ${data.humidity}%`;
  newCard.classList = "col-2 bg-primary m-2 p-2 rounded";
  newCard.append(headH3);
  ul.append(iconImg, tempLi, humidityLi);
  newCard.append(ul);
  forecastContainer.append(newCard);
}
function saveSearch(item) {
  if (!recentSearches.includes(item)) {
    recentSearches.unshift(item);
    localStorage.setItem("recents", JSON.stringify(recentSearches));
  }
  renderSearch();
}

function renderSearch() {
  recent.innerHTML = "";
  for (let i = 0; i < recentSearches.length; i++) {
    var recentBtn = document.createElement("button");
    recentBtn.classList = "list-group-item";
    var item = recentSearches[i];
    recentBtn.innerText = item;
    recent.append(recentBtn);
  }
}

function convert(timestamp) {
  // Months array
  var months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert timestamp to milliseconds
  var date = new Date(timestamp * 1000);

  // Year
  var year = date.getFullYear();

  // Month
  var month = months_arr[date.getMonth()];

  // Day
  var day = date.getDate();

  // Hours
  // var hours = date.getHours();

  // Minutes
  // var minutes = "0" + date.getMinutes();

  // Seconds
  // var seconds = "0" + date.getSeconds();

  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = month + "-" + day + "-" + year;
  // +' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return convdataTime;
}

renderSearch();

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getLocation(cityText.value);
  saveSearch(cityText.value);
  console.log("clicked");
});

recent.addEventListener("click", function (e) {
  var element = e.target;
  // console.log(element);
  var text = element.textContent;
  if (element.matches("button")) {
    getLocation(text);
  }
});