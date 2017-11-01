var fs = require('fs');

module.exports = function(router){
  console.log("Modules Loaded START");
  console.log("===================");
    fs.readdirSync(__dirname).forEach(function(file) {
        if(file == "routes.js") { return; }
        console.log(file)
        var name = `${file}/index.js`;
        router = require('./' + name)(router);
    });
    console.log("===================");
    console.log("Modules Loaded END");
    return router;
}
