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

function getCurrentWeatherFromApi(searchTerm, callback){
  $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apiKey}&units=imperial`,(data) => {
    console.log(data);
  });
}

function getForecastFromApi(callback){
  $.getJSON(`http://api.openweathermap.org/data/2.5/forecast?q=${STORE.location}&APPID=${apiKey}&units=imperial`,(data) => {
    console.log(data);
  });
}

function watchSubmit(){
  //after user clicks submit capture the data
  //
}

