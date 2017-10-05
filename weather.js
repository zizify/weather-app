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
    renderHTML();
	}
	
	else if (STORE.view === 'view-three') {
		renderNextHTML();
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
  $.getJSON(`${API_CREDS.forecastEndpoint}q=${STORE.location},us&APPID=${apiKey}&units=imperial&dt=imperial`,(forecastData) => {
    STORE.forecast[0] = forecastData.list[7];
    STORE.forecast[1] = forecastData.list[15];
		STORE.forecast[2] = forecastData.list[23];
		
		render();
  });
}


function renderHTML(){
		
	$('.results').html(`<h2>Right Now</h2>
		<div class="container day today">
		<p>Current Temp: ${STORE.currentWeather.main.temp}</p>
		<p>Hi: ${STORE.currentWeather.main.temp_max}</p>
		<p>Lo: ${STORE.currentWeather.main.temp_min}</p>
		<p> Whats the sky like?: ${STORE.currentWeather.weather[0].description}</p>
	</div>
	<button type='button' class='next'>Next 3 Days</button>
  `);
}

function renderNextHTML() {

	$('.next-three').html(`<h2>Next Three Days</h2>
	<div class="container day tomorrow">
	<p>Hi: ${STORE.forecast[0].main.temp_max}</p>
	<p>Lo: ${STORE.forecast[0].main.temp_min}</p>
	<p>What's the sky like? ${STORE.forecast[0].weather[0].description}</p>
	</div>
	<br>
	<div class="container day second-day">
	<p>Hi: ${STORE.forecast[1].main.temp_max}</p>
	<p>Lo: ${STORE.forecast[1].main.temp_min}</p>
	<p>What's the sky like? ${STORE.forecast[0].weather[0].description}</p>
	</div>
	<br>
	<div class="container day third-day">
	<p>Hi: ${STORE.forecast[2].main.temp_max}</p>
	<p>Lo: ${STORE.forecast[2].main.temp_min}</p>
	<p>What's the sky like? ${STORE.forecast[0].weather[0].description}</p>
	</div>`)
}

function watchNextClick(){
  $('.results').on('click', '.next', (event) => {
		STORE.view = 'view-three';
		$('.next').hide();
    getForecastFromApi();
  });
}
watchNextClick();

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