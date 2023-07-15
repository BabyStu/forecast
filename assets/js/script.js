// var resultTextEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var searchInputEl = document.querySelector('#search-input');
var resultContentEl = document.querySelector('#result-content');

let lon;
let lat;

function getCoordinates() {
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

    var cityName = searchInputEl.value;
    console.log(cityName)

    locQueryUrl += cityName + '&appid=' + apiKey;

    fetch(locQueryUrl)
        .then(function (response) {

            return response.json();
        })
        
        .then(function (data) {
            console.log(data)

            getForecast(data.coord);
            
    });
}

function getForecast(coord) {
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=';

    console.log('Latitude:', coord.lat);
    console.log('Longitude:', coord.lon);

    locQueryUrl = locQueryUrl + coord.lat + '&lon=' + coord.lon + '&appid=' + apiKey;

    fetch(locQueryUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        
        .then(function (weather) {
            console.log(weather)
            
            var wind = weather.list[0].wind.speed;
            
            console.log(weather.city.name, weather.list[0].wind.speed, wind)
            
            printResults(weather);
        });
    
}

function printResults(fiveDays) {

    var city = fiveDays.city.name;

    var dayOne = fiveDays.list[0];
    var dayTwo = fiveDays.list[8];
    var dayThree = fiveDays.list[16];
    var dayFour = fiveDays.list[24];
    var dayFive = fiveDays.list[32];

    var dayOneCard = createDayCard(dayOne);
    var dayTwoCard = createDayCard(dayTwo);
    var dayThreeCard = createDayCard(dayThree);
    var dayFourCard = createDayCard(dayFour);
    var dayFiveCard = createDayCard(dayFive);

    // var dayCard = document.createElement('div'); 

}


function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    getCoordinates(getForecast);

}

const apiKey = '8e079de333c4c9144eb19dab7ab32eac';

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=8e079de333c4c9144eb19dab7ab32eac

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=8e079de333c4c9144eb19dab7ab32eac
