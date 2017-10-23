module.exports = function(router){
  router.get("/test",function(req,res){
    res.send({
      "message": "test module"
    })
  });

  return router;
}
