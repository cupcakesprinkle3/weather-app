var cityFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector("#current-container");
var futureContainerEl = document.querySelector("#future-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentIcon = document.querySelector("#current-icon");
var currentTemp = document.querySelector("#current-temp");
var currentHumidity = document.querySelector("#current-humidity");
var currentWindSpeed = document.querySelector("#current-wind");
var currentUVIndex = document.querySelector("#current-uv");

var formSubmitHandler = function(event) {
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

/* var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
  }
};
*/

var getCurrentWeather = function(city) {
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e44e55031bbc16b91eed1671117de4ac";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        return response.json();    
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(function(data) {
        console.log(data);
        console.log(data.weather[0].main);
        console.log(data.name);
        console.log(data.coord.lat)
        console.log(data.coord.lon)
        citySearchTerm.textContent = data.name;
        console.log(data.weather[0]);
      //  currentIcon.textContent = data.weather.icon;
        currentTemp.innerHTML = data.main.temp;
        getFiveDay(data.coord.lat, data.coord.lon);
    })
    .catch(function(error) {
      console.log(error);  
      alert("Unable to connect to OpenWeather API");
    });

var getFiveDay = function(lat,lon) {
    var apiFive2Url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=e44e55031bbc16b91eed1671117de4ac"
    fetch(apiFive2Url)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        return response.json();    
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(function(data) {
        console.log(data);

    })
    .catch(function(error) {
      console.log(error);  
      alert("Unable to connect to OpenWeather API");
    });
}    

};



/* var getFeaturedRepos = function(language) {
  // format the github api url
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};
*/

var displayCurrentWeather = function(city) {
/*  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  */

  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);
