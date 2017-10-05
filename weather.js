'use strict';
const weatherApiUrl = 'api.openweathermap.org/data/2.5/weather?';
const apiKey = 'a011671d71060d9062c408e8b9dc8ba9';
const query = 'Austin';

const STORE = {

  view: 'initial',
  location: '',
  currentWeather: {},
  forecast: [
    {}, {}, {}
  ]
};

function getCurrentWeatherFromApi(){
  $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${STORE.location},us&APPID=${apiKey}&units=imperial`,(data) => {
    STORE.currentWeather = data;
    STORE.view = 'view-two'
    console.log(STORE.currentWeather);
  });
}

function getForecastFromApi(){
  $.getJSON(`http://api.openweathermap.org/data/2.5/forecast?q=${STORE.location},us&APPID=${apiKey}&units=imperial`,(data) => {
    console.log(data);
  });
}



function displayCurrentWeatherToDom(){
  //Take in rendered html and display on the dom
}

function renderHTML(){

}




function watchSubmit(){
  //after user clicks submit capture the data
  //clear out the search field
  //pass the cityName to STORE.location
  //call the getCurrentWeatherFromApi function
  //call a display to dom function
  render();
}
$(watchSubmit);