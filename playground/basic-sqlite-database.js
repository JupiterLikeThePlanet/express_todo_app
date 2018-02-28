var Sequelize = require ('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

//defining object and attributes

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})



    //{force: true} is a sync param that will drop tables
sequelize.sync({force: true}).then(function() {
    console.log('Everything is synced');

    Todo.create({
        description: "Oingo Boingo",
        completed: false
    }).then(function(todo){
        console.log('FINISHED!');
        console.log(todo);
    }).catch(function(e){
        console.log("ERROR : " + e.message);
    });
});

