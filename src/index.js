const config = require('./config');
const express = require('express');
const router = express.Router();
const app = express();

app.get('/', (req, res) => {
  console.log(process.env);
  res.send({
    'message': `welcome to ${config.APP_NAME} API version: ${config.VERSION}, Database: ${config.DATABASE_URL}`
  });
});

app.use('/api', require('./modules/routes')(router));

app.listen(config.PORT, function () {
  console.log(`Server Starts on ${config.PORT}`);
});
