
module.exports = function(router){
  router.get("/signin",function(req,res, done){
    res.send({
      "message": "auth signin"
    })
  });
  router.get("/signout",function(req,res){
    res.send({
      "message": "signout"
    })
  });
  router.get("/signup",function(req,res){
    res.send({
      "message": "signup"
    })
  });

  return router;
}
