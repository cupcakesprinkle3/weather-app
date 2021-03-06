var cityFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector("#current-container");
var futureContainerEl = document.querySelector("#future-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentDate = document.querySelector("#current-date");
var currentIcon = document.querySelector("#current-icon");
var currentTemp = document.querySelector("#current-temp");
var currentHumidity = document.querySelector("#current-humidity");
var currentWindSpeed = document.querySelector("#current-wind");
var currentUVIndex = document.querySelector("#current-uv");
var futureDate1 = document.querySelector("#future-date-1");
var futureDate2 = document.querySelector("#future-date-2");
var futureDate3 = document.querySelector("#future-date-3");
var futureDate4 = document.querySelector("#future-date-4");
var futureDate5 = document.querySelector("#future-date-5");
var futureIcon1 = document.querySelector("#future-icon-1");
var futureIcon2 = document.querySelector("#future-icon-2");
var futureIcon3 = document.querySelector("#future-icon-3");
var futureIcon4 = document.querySelector("#future-icon-4");
var futureIcon5 = document.querySelector("#future-icon-5");
var futureTemp1 = document.querySelector("#future-temp-1");
var futureTemp2 = document.querySelector("#future-temp-2");
var futureTemp3 = document.querySelector("#future-temp-3");
var futureTemp4 = document.querySelector("#future-temp-4");
var futureTemp5 = document.querySelector("#future-temp-5");
var futureWind1 = document.querySelector("#future-wind-1");
var futureWind2 = document.querySelector("#future-wind-2");
var futureWind3 = document.querySelector("#future-wind-3");
var futureWind4 = document.querySelector("#future-wind-4");
var futureWind5 = document.querySelector("#future-wind-5");
var futureHumidity1 = document.querySelector("#future-humidity-1");
var futureHumidity2 = document.querySelector("#future-humidity-2");
var futureHumidity3 = document.querySelector("#future-humidity-3");
var futureHumidity4 = document.querySelector("#future-humidity-4");
var futureHumidity5 = document.querySelector("#future-humidity-5");
var showlastCity = document.querySelector("#lastCity");
var cityEl = document.querySelector("#city-buttons");


var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    // clear old content
    currentTemp.textContent = "";
    cityInputEl.value = "";
    getCurrentWeather(city);
  } else {
    alert("Please enter a valid city name");
  }
};

var getCurrentWeather = function (city) {
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e44e55031bbc16b91eed1671117de4ac";

  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(function (data) {
      console.log(data);
      console.log(data.weather[0].main);
      console.log(data.name);
      citySearchTerm.textContent = data.name;
      console.log(data.weather[0]);
      var unixTimestamp = data.dt * 1000;
      var dateObject = new Date(unixTimestamp);
      var humanDateFormat = dateObject.toLocaleString()
      currentDate.innerHTML = humanDateFormat;
      // CREDIT TO ARTICLE FOR DATE FORMAT: https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
      var iconCode = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
      currentIcon.setAttribute('src', iconUrl);
      // CREDIT to STACK O for Icon solution: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
      currentTemp.innerHTML = data.main.temp;
      currentHumidity.innerHTML = data.main.humidity;
      currentWindSpeed.innerHTML = data.wind.speed;
      getFiveDay(data.coord.lat, data.coord.lon);

      var pastSearches = JSON.parse(localStorage.getItem("history")) || [];
      pastSearches.push(data.name);
      pastSearches = JSON.stringify(pastSearches);

      localStorage.setItem("history", pastSearches);
      displayHistory();
    })
    .catch(function (error) {
      console.log(error);
      if (error) alert("Unable to connect to OpenWeather API");
    });

  var getFiveDay = function (lat, lon) {
    var apiFive2Url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=e44e55031bbc16b91eed1671117de4ac"
    fetch(apiFive2Url)
      .then(function (response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .then(function (data) {
        console.log(data);
        currentUVIndex.innerHTML = data.daily[0].uvi;
        // CREDIT TO STACK O - https://stackoverflow.com/questions/13727735/changing-text-colour-or-background-depending-on-value-of-input-field
        function changeUVColor() {
          document.getElementById("current-uv").className = "";
          if (data.daily[0].uvi < 6) {
            document.getElementById("current-uv").className = "low-risk";
          }
          else if (data.daily[0].uvi >= 6 && data.daily[0].uvi <= 7) {
            document.getElementById("current-uv").className = "medium-risk";
          }
          else {
            document.getElementById("current-uv").className = "high-risk";
          }
        }
        changeUVColor();
        // DAY ONE FORECAST
        var unixTimestamp = data.daily[1].dt * 1000;
        var dateObject = new Date(unixTimestamp);
        var humanDateFormat = dateObject.toLocaleString()
        futureDate1.innerHTML = humanDateFormat;
        var iconCode = data.daily[1].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        futureIcon1.setAttribute('src', iconUrl);
        futureTemp1.innerHTML = data.daily[1].temp.day;
        futureWind1.innerHTML = data.daily[1].wind_speed;
        futureHumidity1.innerHTML = data.daily[1].humidity;
        // DAY TWO FORECAST
        var unixTimestamp = data.daily[2].dt * 1000;
        var dateObject = new Date(unixTimestamp);
        var humanDateFormat = dateObject.toLocaleString()
        futureDate2.innerHTML = humanDateFormat;
        var iconCode = data.daily[2].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        futureIcon2.setAttribute('src', iconUrl);
        futureTemp2.innerHTML = data.daily[2].temp.day;
        futureWind2.innerHTML = data.daily[2].wind_speed;
        futureHumidity2.innerHTML = data.daily[2].humidity;
        // DAY THREE FORECAST
        var unixTimestamp = data.daily[3].dt * 1000;
        var dateObject = new Date(unixTimestamp);
        var humanDateFormat = dateObject.toLocaleString()
        futureDate3.innerHTML = humanDateFormat;
        var iconCode = data.daily[3].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        futureIcon3.setAttribute('src', iconUrl);
        futureTemp3.innerHTML = data.daily[3].temp.day;
        futureWind3.innerHTML = data.daily[3].wind_speed;
        futureHumidity3.innerHTML = data.daily[3].humidity;
        // DAY FOUR FORECAST
        var unixTimestamp = data.daily[4].dt * 1000;
        var dateObject = new Date(unixTimestamp);
        var humanDateFormat = dateObject.toLocaleString()
        futureDate4.innerHTML = humanDateFormat;
        var iconCode = data.daily[4].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        futureIcon4.setAttribute('src', iconUrl);
        futureTemp4.innerHTML = data.daily[4].temp.day;
        futureWind4.innerHTML = data.daily[4].wind_speed;
        futureHumidity4.innerHTML = data.daily[4].humidity;
        // DAY FIVE FORECAST
        var unixTimestamp = data.daily[5].dt * 1000;
        var dateObject = new Date(unixTimestamp);
        var humanDateFormat = dateObject.toLocaleString()
        futureDate5.innerHTML = humanDateFormat;
        var iconCode = data.daily[5].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        futureIcon5.setAttribute('src', iconUrl);
        futureTemp5.innerHTML = data.daily[5].temp.day;
        futureWind5.innerHTML = data.daily[5].wind_speed;
        futureHumidity5.innerHTML = data.daily[5].humidity;

      })
      .catch(function (error) {
        console.log(error);
        if (error) alert("Unable to connect to OpenWeather API");
      });
  }

};

function displayHistory() {
  var pastSearches = JSON.parse(localStorage.getItem("history")) || [];
  cityEl.innerHTML = "";
  for (let i = 0; i < pastSearches.length; i++) {
    var button = document.createElement("button");
    button.innerText = pastSearches[i];
    button.addEventListener("click", function () {
      getCurrentWeather(pastSearches[i]);
    });
    cityEl.append(button);
  }
}

// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);

displayHistory();