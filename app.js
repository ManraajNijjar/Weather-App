const request = require('request');
const yargs = require('yargs');

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

request({
  url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
  json: true
}, (error, response, body)=>{
  console.log(`Address: ${body.results[0].formatted_address}`);
});
