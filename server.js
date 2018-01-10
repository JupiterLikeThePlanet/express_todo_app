var express = require('express');
var app = express();

var PORT = 3000

app.get('/', function(req, res) {
	res.send("Hellooooo Nurse");
});



// app.listen(PORT, "Your server is now up and running on port " + PORT);

// var express = require('express');

app.listen(3000);






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