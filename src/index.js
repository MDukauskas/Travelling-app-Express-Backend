const CONFIG = require('./config');
const express = require('express');
const moongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(bodyParser.json());

moongoose.Promise = global.Promise;
moongoose
  .connect(CONFIG.DATABASE_URL)
  .then(() => {
    console.log('mongo connected');
  })
  .catch(err => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send({
    message: `welcome to ${CONFIG.APP_NAME} API version: ${CONFIG.VERSION}`
  });
});

app.use('/api', require('./modules/routes')(router));

const server = app.listen(CONFIG.PORT, function() {
  console.log(`Server Starts on ${CONFIG.PORT}`);
});

module.exports = {
  server: server,
  app: app
};
