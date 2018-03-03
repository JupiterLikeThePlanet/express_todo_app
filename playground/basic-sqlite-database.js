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
sequelize.sync().then(function() {
    console.log('Everything is synced');


    function findOneInstance(todo) {
        return Todo.findOne({
            where: {
                description: todo
            }
        })
    }

    function findByTodoId(id) {
        return Todo.findById(id).then(function(todo){
            console.log('Found id ' + todo.id + ' and the description is ' + todo.description)
            console.log(todo.toJSON())
        })
    }

    findOneInstance('Evo Devo').then(function(todo){
        console.log("Here is your TODO: " + todo.description)
        console.log(todo.toJSON())
    }).catch(function(e){
        console.log("ERROR : " + e.message);
    });


    findByTodoId(1).catch(function(e){
        console.log("ERROR : " + e.message);
    });





        // .then(function(todo){
        //     // todo will be the first entry of the Todos table with the title 'Oingo Boing' || null
        //     // todo.description will contain the descritpion
        //
        //     // return todo
        //     console.log(todo.toJSON)
        // })
    // }



    // Todo.create({
    //     description: "Oingo Boingo",
    //     completed: false
    // }).then(function(todo) {
    //     return Todo.create({
    //         description: "Evo Devo"
    //     })
    // }).then(function( ){
    //     // Todo.findById(1).then(todo => {
    //     //     console.log(todo)
    //     // })
    //     return Todo.findAll({
    //         where: {
    //             description: {
    //                 $like: '%devo%'
    //             }
    //         }
    //     });
    // }).then(function(todos){
    //     if (todos) {
    //         todos.forEach(function(todo){
    //             console.log(todo.toJSON());
    //         })
    //     } else {
    //         console.log("No todos Found!")
    //     }
    // // })
    //     // console.log('FINISHED!');
    //     // console.log(todo);
    // }).catch(function(e){
    //     console.log("ERROR : " + e.message);
    // });
});

