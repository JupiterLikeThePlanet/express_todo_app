var express = require('express');
var app = express();
var PORT = 3000;
var middleware = require("./middleware.js")



//Application level
app.use(middleware.logger);
//important to specify middleware up top. Won't run after /about route
// app.use(middleware.requireAuthentication);

//route level middleware (e.g. something that requires user to be logged in)
app.get('/about', middleware.requireAuthentication, function(req, res) {
	res.send("About A Boy by Nick Hornby");
});

app.use(express.static(__dirname + "/public"));
// >> replaces this stuff
	// app.get('/', function(req, res) {
	// 	res.send("Hellooooo Nurse");
	// });

app.listen(PORT, function(){
	console.log("Your server is now up and running on port " + PORT);
});
