'use strict';
const baseApiUrl = 'http://api.openweathermap.org/data/2.5/';
const weatherEndpoint = baseApiUrl + 'weather?';
const forecastEndpoint = baseApiUrl + 'forecast?';
const apiKey = 'a011671d71060d9062c408e8b9dc8ba9';

const API_CREDS = {
  baseApiUrl: 'http://api.openweathermap.org/data/2.5/',
  weatherEndpoint: baseApiUrl + 'weather?',
  forecastEndpoint: baseApiUrl + 'forecast?',
  apiKey: 'a011671d71060d9062c408e8b9dc8ba9'
};

const STORE = {
  view: 'initial',
  location: '',
  currentWeather: {},
  forecast: [
    {}, {}, {}
  ]
};

function render() {
  //add else if for 'view-three'
  if (STORE.view === 'view-two') {
    displayCurrentWeather();
  }
}

function getCurrentWeatherFromApi(){
  $.getJSON(`${API_CREDS.weatherEndpoint}q=${STORE.location},us&APPID=${apiKey}&units=imperial`,(data) => {
    STORE.currentWeather = data;
    console.log(STORE.currentWeather);
		
    render();
  });
}

function getForecastFromApi(){
  $.getJSON(`${API_CREDS.forecastEndpoint}q=${STORE.location},us&APPID=${apiKey}&units=imperial`,(data) => {
    console.log(data);
  });
}

function displayCurrentWeather(){
	//adds data to DOM
  //renderHTML()
}

function renderHTML(){
  return `
		<div class="container day today">
		<p>${STORE.currentWeather.main.temp}</p>
		<p>Hi: (num)</p>
		<p>Lo: (num)</p>
		<p>(Sunny)</p>
		<p>Chance of rain/snow: (num)</p>
	</div>`
}




function watchSubmit(){

  //after user clicks submit capture the data
  //clear out the search field
  //pass the cityName to STORE.location
  //change STORE.view
  //call the getCurrentWeatherFromApi function
  //call render function

  $('form').on('submit', function(event) {
    event.preventDefault;
    let loc = $(event.currentTarget).find('.input-location').val();
    STORE.location = loc;

    $('.input-location').val('');

    STORE.currentWeather = {};
    STORE.forecast = [];
    STORE.view = 'view-two';
		
    getCurrentWeatherFromApi();
  });
}

$(watchSubmit);