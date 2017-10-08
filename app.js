const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
    console.log(JSON.stringify(results, undefined, 2));
  }
});
