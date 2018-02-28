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
    }).then(function(todo) {
        return Todo.create({
            description: "Evo Devo"
        })
    }).then(function( ){
        // Todo.findById(1).then(todo => {
        //     console.log(todo)
        // })
        return Todo.findAll({
            where: {
                completed: false
            }
        });
    }).then(function(todos){
        if (todos) {
            todos.forEach(function(todo){
                console.log(todo.toJSON());
            })
        } else {
            console.log("No todos Found!")
        }
    // })
        // console.log('FINISHED!');
        // console.log(todo);
    }).catch(function(e){
        console.log("ERROR : " + e.message);
    });
});

