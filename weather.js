'use strict';
function api_creds() {
  this.baseApiUrl = 'http://api.openweathermap.org/data/2.5/';
  this.weatherEndpoint = this.baseApiUrl + 'weather?';
  this.forecastEndpoint = this.baseApiUrl + 'forecast?';
  this.apiKey = 'a011671d71060d9062c408e8b9dc8ba9';
  this.giphyEndpoint = 'http://api.giphy.com/v1/gifs/random?';
  this.giphyApiKey = 'wXgyXTR1PI1IHHGcY0yv24Vz2UQkPOq4';

}

const creds = new api_creds();

const STORE = {
  view: 'initial',
  location: '',
  currentWeather: {},
  forecast: [
    {}, {}, {}
  ]
};

const backgrounds = {
  sunny: '',
  rain: '',
  cloudy: ''
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
function getGiphyStuff(){
  $.getJSON(`${creds.giphyEndpoint}api_key=${creds.giphyApiKey}&tag=Rainy`,(data) => {
    console.log(data);
    backgrounds.rain = data.data.image_original_url;
  });

  $.getJSON(`${creds.giphyEndpoint}api_key=${creds.giphyApiKey}&tag=Sun`,(data) => {
    console.log(data);
    backgrounds.sunny = data.data.image_original_url;
  });

  $.getJSON(`${creds.giphyEndpoint}api_key=${creds.giphyApiKey}&tag=Clouds`,(data) => {
    console.log(data);
    backgrounds.cloudy = data.data.image_original_url;
  });
}

function getCurrentWeatherFromApi(){
  $.getJSON(`${creds.weatherEndpoint}q=${STORE.location},us&APPID=${creds.apiKey}&units=imperial`,(data) => {
    STORE.currentWeather = data;
    console.log(STORE.currentWeather);
		
    render();
  });
}

function getForecastFromApi(){
  $.getJSON(`${creds.forecastEndpoint}q=${STORE.location},us&APPID=${creds.apiKey}&units=imperial&dt=imperial`,(forecastData) => {
    STORE.forecast[0] = forecastData.list[7];
    STORE.forecast[1] = forecastData.list[15];
    STORE.forecast[2] = forecastData.list[23];
		
    render();
  });
}


function renderHTML(){
		
  $('.results').html(`<h2>Right Now</h2>
		<div class="container day today">
		<p><span class="larger">${Math.round(STORE.currentWeather.main.temp)} °F</span></p>
		<p class="conditions">${STORE.currentWeather.weather[0].description}</p>
	</div>
	<button type='button' class='next'>Next 3 Days</button>
	`);
	
  changeColor('.today', STORE.currentWeather);
}

function renderNextHTML() {

  $('.next-three').html(`<h2>Next Three Days</h2>
	<div class="container day tomorrow">
	<p><span class="large">${Math.round(STORE.forecast[0].main.temp)} °F</span></p>
	<p class="conditions">${STORE.forecast[0].weather[0].description}</p>
	</div>
	<div class="container day second-day">
	<p><span class="large">${Math.round(STORE.forecast[1].main.temp)} °F</span></p>
	<p class="conditions">${STORE.forecast[1].weather[0].description}</p>
	</div>
	<div class="container day third-day">
	<p><span class="large">${Math.round(STORE.forecast[2].main.temp)} °F</span></p>
	<p class="conditions">${STORE.forecast[2].weather[0].description}</p>
	</div>`);

  changeColor('.tomorrow', STORE.forecast[0]);
  changeColor('.second-day', STORE.forecast[1]);
  changeColor('.third-day', STORE.forecast[2]);
}

function changeColor(day, directory) {
	
  let num = directory.weather[0].id;
  let weatherClass = '';

  if (num < 300) {
    $('body').css('background-image', `url('${backgrounds.rain}')`);
    weatherClass = 'thunder';
    $(day).append(`<div style="width:10%;height:0;padding-bottom:10%;position:relative;">
		<iframe src="https://giphy.com/embed/VtOUGnwCOouCQ" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
		</iframe></div>`);
  }
  else if (num >= 300 && num < 600) {
    $('body').css('background-image', `url('${backgrounds.rain}')`);
    weatherClass = 'rain';
    $(day).append(`<div style="width:10%;height:0;padding-bottom:10%;position:relative;">
		<iframe src="https://giphy.com/embed/3ov9jCEFMBtCy54q6Q" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
		</iframe></div>`);
  }
  else if (num >= 600 && num < 700) {
    $('body').css('background-image', `url('${backgrounds.cloudy}')`);
    weatherClass = 'clouds-snow';
    $(day).append(`<div style="width:10%;height:0;padding-bottom:10%;position:relative;">
		<iframe src="https://giphy.com/embed/mBwNH39wXmJDq" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
		</iframe></div>`);
  }
  else if (num >= 700 && num < 800) {
    $('body').css('background-image', `url('${backgrounds.cloudy}')`);
    weatherClass = 'clouds-snow';
    $(day).append(`<div style="width:10%;height:0;padding-bottom:10%;position:relative;">
		<iframe src="https://giphy.com/embed/xUPGcL7GsJ5398axOg" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
		</iframe></div>`);
  }
  else if (num === 800) {
    $('body').css('background-image', `url('${backgrounds.sunny}')`);
    weatherClass = 'clear';
    $(day).append(`<div style="width:10%;height:0;padding-bottom:10%;position:relative;">
		<iframe src="https://giphy.com/embed/xUPGcL7GsJ5398axOg" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
		</iframe></div>`);
  }
  else if (num > 800 && num < 900) {
    $('body').css('background-image', `url('${backgrounds.cloudy}')`);
    weatherClass = 'clouds-snow';
    $(day).append(`<div style="width:10%;height:0;padding-bottom:10%;position:relative;">
		<iframe src="https://giphy.com/embed/RHQtNg5bQ123C" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
		</iframe></div>`);
  }
  else if (num >= 900 & num < 910) {
    weatherClass = 'severe';
    $(day).append(`<div style="width:10%;height:0;padding-bottom:10%;position:relative;">
		<iframe src="https://giphy.com/embed/sN2N93vQwhsys" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
		</iframe></div>`);
  }

  $(day).addClass(weatherClass);
}


function watchNextClick(){
  $('.results').on('click', '.next', () => {
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

    $('.next-three').children().remove();

    STORE.currentWeather = {};
    STORE.forecast = [];
    STORE.view = 'view-two';
    getGiphyStuff();
    getCurrentWeatherFromApi();
  });
}

$(watchSubmit);