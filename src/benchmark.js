const siege = require('siege');
const config = require('./config');

siege()
  .on(config.PORT)
  .concurrent(100)
  .get("/")
  .attack();

  siege()
    .on(config.PORT)
    .concurrent(100)
    .get("/test")
    .attack();
