const { authentication_middleware } = require('../authentication/authentication_middleware');

module.exports = function(router){
  router.get("/journey",authentication_middleware, (req,res) => {
    res.send({
      message: 'all jouneys'
    })
  });

  router.get("/journey/:id",authentication_middleware, (req,res) => {
    res.send(req.params.id)
  });

  return router;
}
