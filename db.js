var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
        protocol: 'postgres',
        logging:  true
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-todo-api.sqlite'
	});
}

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//setting it to an object allows up to pass multiple things instead of just one

module.exports = db;
















// var Sequelize = require ('sequelize');
// // will either load prod or dev, then upload approp db
// var env = process.env.NODE_ENV || 'development';
// var sequelize;
//
//
// if (env === 'production') {
//     sequelize = new Sequelize(process.env.DATABASE_URL, {
//         'dialect': 'postgres'
//     });
// }else{
//     sequelize = new Sequelize(undefined, undefined, undefined, {
//         'dialect': 'sqlite',
//         'storage': __dirname + '/data/dev-todo-api.sqlite'
//     });
// }
//
// var db = {}
//
// db.todo = sequelize.import(__dirname + '/models/todo.js')
// db.sequelize = sequelize
// db.Sequelize = Sequelize
//
// //setting it to an object allows up to pass multiple things instead of just one
// module.exports = db;

