const yargs = require('yargs');
const axios = require('axios');

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

var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`
axios.get(geocodeURL).then((success) => {
  if(success.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  var lat = success.data.results[0].geometry.location.lat
  var long = success.data.results[0].geometry.location.lng
  var weatherURL = `https://api.darksky.net/forecast/359ec26b240e5eb73b335bc5afbfb731/${lat},${long}`
  return axios.get(weatherURL);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(temperature, apparentTemperature);
}).catch((e) => {
  if (e.code === 'ENOTFOUND'){
    console.log('Unable to connect');
  } else {
    console.log(e.message);
  }
});
