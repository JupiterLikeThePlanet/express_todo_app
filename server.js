var express = require('express');

var app = express();

var PORT = process.env.PORT || 3000;



app.get("/", function(req, res){
    res.send("We are not in Kansas anymore, TODO");
})

app.listen(PORT, function(){
    console.log("We are always listening at " + PORT)
})