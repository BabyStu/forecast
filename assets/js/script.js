
var searchFormEl = document.querySelector('#search-form');
var searchInputEl = document.querySelector('#search-input');
var fiveDayWeatherBox = document.querySelector('#five-day-weather');
var todayWeatherBox = document.querySelector('#today-weather');
var fiveDayHeaderBox = document.querySelector('#fiveDayHeader');
var recentSearchBox = document.querySelector('#recentSearch');

let lon;
let lat;

function getCoordinates() {
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';


    locQueryUrl += searchInputEl.value + '&appid=' + apiKey;

    fetch(locQueryUrl)
        .then(function (response) {

            return response.json();
        })
        
        .then(function (data) {
            console.log(data)

            getForecast(data.coord);
            printToday(data);
            
    });
}

function getForecast(coordinates) {
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=';

    console.log('Latitude:', coordinates.lat);
    console.log('Longitude:', coordinates.lon);

    locQueryUrl = locQueryUrl + coordinates.lat + '&lon=' + coordinates.lon + '&appid=' + apiKey;

    fetch(locQueryUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        
        .then(function (weather) {
            console.log(weather)
            
            printFiveDay(weather);
        });
    
}

function printToday(today){

    var todayWeather = [today.wind.speed, today.main.temp, today.main.humidity, today.name];

    var todayCard = createTodayCard(todayWeather);
    var cities = createCityCard(todayWeather[3]);

    todayWeatherBox.appendChild(todayCard);
    recentSearchBox.appendChild(cities);
}

function createCityCard(city) {
    var cityDiv = document.createElement('div');
    cityDiv.classList.add('previousSearches');
    cityDiv.textContent = city;

    return cityDiv;
}


function printFiveDay(fiveDays) {

    var city = fiveDays.city.name;
    console.log(fiveDays.list[0])

    var dayOne = fiveDays.list[4];
    var dayTwo = fiveDays.list[12];
    var dayThree = fiveDays.list[20];
    var dayFour = fiveDays.list[28];
    var dayFive = fiveDays.list[36];

    dayOne = [dayOne.dt_txt, dayOne.wind.speed, dayOne.main.temp, dayOne.main.humidity];
    dayTwo = [dayTwo.dt_txt, dayTwo.wind.speed, dayTwo.main.temp, dayTwo.main.humidity];
    dayThree = [dayThree.dt_txt, dayThree.wind.speed, dayThree.main.temp, dayThree.main.humidity];
    dayFour = [dayFour.dt_txt, dayFour.wind.speed, dayFour.main.temp, dayFour.main.humidity];
    dayFive = [dayFive.dt_txt, dayFive.wind.speed, dayFive.main.temp, dayFive.main.humidity];

    var day1 = createDayCard(dayOne);
    var day2 = createDayCard(dayTwo);
    var day3 = createDayCard(dayThree);
    var day4 = createDayCard(dayFour);
    var day5 = createDayCard(dayFive);
    var header = "5 day forecast";

    var heading = document.createElement('h2');
    heading.classList.add('fiveDayHeader');
    heading.textContent = header;

    fiveDayHeaderBox.appendChild(heading);
    fiveDayWeatherBox.appendChild(day1);
    fiveDayWeatherBox.appendChild(day2);
    fiveDayWeatherBox.appendChild(day3);
    fiveDayWeatherBox.appendChild(day4);
    fiveDayWeatherBox.appendChild(day5);
}

function createTodayCard(today) {

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var date = month + '-' + day + '-' + year;

    var dayCard = document.createElement('div');
    dayCard.classList.add('today-card');


    var cityDate = document.createElement('h2');
    cityDate.textContent = today[3] + '  ' + date;
    dayCard.appendChild(cityDate);
    
    var windSpeed = document.createElement('div');
    windSpeed.textContent = 'Wind Speed: ' + today[0] + ' MPH';
    dayCard.appendChild(windSpeed);
  
    var temperature = document.createElement('div');
    temperature.textContent = 'Temperature: ' + ((today[1] - 273.15)*9/5+32).toFixed(1) + ' F';
    dayCard.appendChild(temperature);
  
    var humidity = document.createElement('div');
    humidity.textContent = 'Humidity: ' + today[2] + '%';
    dayCard.appendChild(humidity);

    return dayCard;
    
}


function createDayCard(daily) {
    var dayCard = document.createElement('div');
    dayCard.classList.add('five-day-card');

    console.log(daily)
    
    var date = document.createElement('p');
    var dateTime = daily[0];
    var onlyDate = dateTime.slice(0, 10);

    date.textContent = onlyDate;
    date.classList.add('bold');
    dayCard.appendChild(date);

    var windSpeed = document.createElement('p');
    windSpeed.textContent = 'Wind Speed: ' + daily[1] + ' MPH';
    dayCard.appendChild(windSpeed);
  
    var temperature = document.createElement('p');
    temperature.textContent = 'Temperature: ' + ((daily[2]- 273.15)*9/5+32).toFixed(1) + ' F';
    dayCard.appendChild(temperature);
  
    var humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + daily[3] + '%';
    dayCard.appendChild(humidity);
  
    return dayCard;
  }

  function clear() {
    fiveDayHeaderBox.innerHTML = '';
    fiveDayWeatherBox.innerHTML = '';
    todayWeatherBox.innerHTML = '';
  }

function handleSearchFormSubmit(event) {
    event.preventDefault();


    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    clear();
    getCoordinates(getForecast);
}



const apiKey = '8e079de333c4c9144eb19dab7ab32eac';

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=8e079de333c4c9144eb19dab7ab32eac
