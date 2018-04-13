const PORT = process.env.PORT || 8000;
const MAJOR = 0;
const MINOR = 0;
const PATCH = 1;
const APP_NAME = 'travelling app';
const BUCKET_NAME = process.env.BUCKET_NAME;
const DATABASE_URL =
  process.env.NODE_ENV == 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;
const TOKEN_KEY = 'testas'; //process.env.TOKEN_KEY;
const VERSION = `${MAJOR}.${MINOR}.${PATCH}`;

module.exports = {
  PORT,
  MAJOR,
  MINOR,
  PATCH,
  VERSION,
  APP_NAME,
  DATABASE_URL,
  TOKEN_KEY
};
