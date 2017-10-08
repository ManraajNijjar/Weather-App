const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
  address: {
    demand: true,
    alias: 'a',
    describe: 'The address where you want to see the weather',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

var encodeAddress = encodeURIComponent(argv.a);

geocode.fetchAddress(encodeAddress, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    weather.fetchWeather(results.latitude, results.longitude, (weatherResults) => {
      console.log(weatherResults);
    });
  }
});
