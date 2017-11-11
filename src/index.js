const config = require('./config');
const express = require('express');
const moongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(bodyParser.json());

moongoose.Promise = global.Promise;
moongoose.connect(config.DATABASE_URL, {
  useMongoClient: true
});
app.get('/', (req, res) => {
  res.send({
    'message': `welcome to ${config.APP_NAME} API version: ${config.VERSION}`
  });
});

app.use('/api', require('./modules/routes')(router));

const server = app.listen(config.PORT, function () {
  console.log(`Server Starts on ${config.PORT}`);
});

module.exports = {
    server : server,
    app : app
};
