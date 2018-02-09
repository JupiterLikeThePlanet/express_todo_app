var Sequelize = require ('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database'
});

//defining object and attributes

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN
    }
})



    //force: true is a sync param that will drop tables
sequelize.sync().then(function() {
    console.log('Everything is synced');

    // Todo.create({
    //     description: "Call Friends",
    //     completed: false
    // }).then(function(todo){
    //     console.log('FINISHED!');
    //     console.log(todo);
    // });
});

