var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
	requireAuthentication: function(req, res, next) {
		console.log("Hey now. This is private.");
	}
}

// app.use(middleware.requireAuthentication());

app.get('/', function(req, res) {
	res.send("Hellooooo Nurse");
});

app.get('/about', function(req, res) {
	res.send("Abottobad");
});

app.listen(PORT, function(){
	console.log("Your server is now up and running on port " + PORT);
});

// var express = require('express');

// app.listen(PORT);






// var app = express();
//
// app.get('/', function (req, res) {
// 	res.send('Hello Express!');
// });
//
// app.get('/about', function (req, res) {
// 	res.send('About Us');
// });
//
// app.listen(3000);