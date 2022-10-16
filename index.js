var searchHistory = [];
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchHistoryContainer = document.querySelector('#history');
//Current Forecast
var todayContainer = document.querySelector('#today');
//5-Day Forecast
var forecastContainer = document.querySelector('#forecast');
var searchButton = document.querySelector('#search-button');




//search
    //render
        function renderSearchHistory() {
            searchHistoryContainer.innerHTML = '';

            for (let i = searchHistory.length - 1; i >= 0; i--) {
                var btn = document.createElement('button');
                btn.setAttribute('type', 'button');
                btn.setAttribute('aria-controls', 'today forecast');
                btn.classList.add('history-btn', 'btn-history');

                btn.setAttribute('data-search', searchHistory[i]);
                btn.textContent = searchHistory[i];
                searchHistoryContainer.append(btn);

            }

        }

    //append
        function appendToHistory(search) {
            searchHistory.push(search);
            localStorage.setItem('search-history', JSON.stringify(searchHistory));
            renderSearchHistory();
        }

    //init
    function initSearchHistory() {
        var storedHistory = localStorage.getItem('search-history');
        if (storedHistory) {
            searchHistory = JSON.parse(storedHistory);
        }
        renderSearchHistory();
    }

//forecast
    //render current
        //LARGEST PART OF THE PROJECT
    function renderCurrentWeather(city, weather, timezone) {
        var tempF = weather.temp; 
        var windMph = weather.wind_speed;
        var humidity = weather.humidity;
        var uvi = weather.uvi;

        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var heading = document.createElement('h2');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        var uviEl = document.createElement('p');
        var uviBadge = document.createElement('button');



    }


    function renderForecast() {




    }


    function renderItems(city, data) {
        renderCurrentWeather(city, data);
        renderForecast(data);
    }


    //fetch
        // openweatherAPI
            //fetch coordinates
    function fetchWeather (location) {
        var { lat } = location;
        var { lon } = location;
        var city = location.name;
        var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

        fetch(apiUrl)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                renderItems(city, data);
            })
            .catch(function (err) {
                console.error(err);
            });
    }


    function fetchCoords (search) {
        var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

        fetch(apiUrl)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                if (!data[0]) {
                    alert('Gurl, Bye!')
                } else {
                    appendToHistory(search);
                    fetchWeather(data[0]);
                }
            })
            .catch(function (err) {
                console.error(err);
            })

    }

    // searchButton.onClick() = appendToHistory;
    initSearchHistory();