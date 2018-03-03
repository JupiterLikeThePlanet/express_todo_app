var Sequelize = require ('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/dev-todo-api.sqlite'
});

var db = {}

db.todo = sequelize.import(__dirname + '/models/todo.js')
db.sequelize = sequelize
db.Sequelize = Sequelize

//setting it to an object allows up to pass multiple things instead of just one
module.exports = db;