const { test } = require('./test');

module.exports = function(router){
  router.get("/test", test);

  return router;
}
