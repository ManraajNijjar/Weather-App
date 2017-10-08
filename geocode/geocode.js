const request = require('request');

var fetchAddress = (address, callback) => {
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (error, response, body)=>{
    if (error) {
      callback(error, undefined);
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to Find Address', undefined);
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports = {
  fetchAddress: fetchAddress
}
