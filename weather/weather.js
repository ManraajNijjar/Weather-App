const request = require('request');

var fetchWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/359ec26b240e5eb73b335bc5afbfb731/${lat},${long}`,
    json: true
  }, (error, response, body)=>{
    if (!error && response.statusCode === 200) {
      callback(body.currently)
    } else {
      console.log('Unable to fetch weather');
    }
  });
}

module.exports = {
  fetchWeather: fetchWeather
}
