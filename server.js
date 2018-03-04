var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();

var PORT = process.env.PORT || 5000;

var todoNextId = 1;

var todos = []

app.use(bodyParser.json());

//GET todos

app.get("/", function(req, res){
    res.send("We are not in Kansas anymore, TODO");
})



// GET /todos?completed=true&q=work      //order matters. Must go before get /todos
app.get('/todos', function (req, res) {
    var query = req.query;
    var where = {}

    if (query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true
    } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false
    }


    if (query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            $like: '%' + query.q + '%'
        };
    }

    db.todo.findAll({
        where: where
    }).then(function(todos) {
        res.json(todos)
    }, function(e) {
        res.status(500).send();
    })





    //////////////////// OLD WAY ///////////////////////////////////////
    // var queryParams = req.query;
    // var filteredTodos = todos;
    //
//     if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
//         filteredTodos = _.where(filteredTodos, {completed: true});
//     } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
//         filteredTodos = _.where(filteredTodos, {completed: false});
//     }
//
//     console.log("What am I: " + queryParams.q)
//
//
//     if (queryParams.hasOwnProperty('q') && queryParams.q.trim().length > 0) {
//
//         // console.log("Hit something here")
//         filteredTodos = _.filter(filteredTodos, function (todo) {
//             return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
//         })
//         console.log("filtered todos: " + filteredTodos)
//     }
//
//
//
//     res.json(filteredTodos);

});

app.get("/todos", function(req, res){
    res.json(todos);
})


//GET individual todo

app.get('/todos/:id', function (req, res) {
    // turn the params from a string into an integer
    var todoId = parseInt(req.params.id, 10);


    db.todo.findById(todoId).then(function(todo){
        //if a todo exists
        if (!!todo){
            console.log('Found id ' + todo.id + ' and the description is ' + todo.description)
            res.json(todo.toJSON());
        }else{
            res.status(404).send();
        }

    }, function(e){
            res.status(500).send();
        }
    )



    // var matchedTodo = _.findWhere(todos, {id: todoId});
    //
    //
    // if (matchedTodo) {
    //     res.json(matchedTodo);
    // }else{
    //     res.status(404).send();
    // }

});

// POST a new todo

app.post("/todos", function(req, res){
    //pick the elements from the api for authentication or, rather, what you want
    var body = _.pick(req.body, 'description', 'completed')


    db.todo.create(body).then(function(todo) {
        console.log("description: " + todo.description, ", completed: " + todo.completed, ", id: " + todo.id);
        res.json(todo.toJSON());
    }, function(e){
        res.status(400).json(e)
    })

    // if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
    //     // res.status(400).send();
    //     return res.status(400).send();
    // }
    //
    // body.description = body.description.trim()
    //
    // body.id = todoNextId++
    //
    //
    // todos.push(body)
    //
    // console.log("description: " + body.description, ", completed: " + body.completed, ", id: " + body.id);
    //
    // res.json(body);
    //

});

// DELETE

app.delete("/todos/:id", function(req, res){
    var todoId = parseInt(req.params.id, 10)

    // console.log("TODO id: " + todoId)

    //takes in object and can use object attribute
    var deletedTodo = _.findWhere(todos, {id: todoId});

    // console.log("Deleted TODO: " + deletedTodo)

    if (!deletedTodo) {

        // console.log("In the if statement");

        res.status(404).json({"error": "No TODO found with that id"});


    }else{
        // console.log("In the else statement")

        var todoArray = _.without(todos, deletedTodo);

        // console.log("Todo Array: " + todoArray)

        // console.log("Deleted TODO: " + deletedTodo);

        res.json(todoArray);

    }


});


// PUT

app.put("/todos/:id", function(req, res){

    var todoId = parseInt(req.params.id, 10)
    var body = _.pick(req.body, 'description', 'completed')
    var validAttributes = {}
    var updatedTodo = _.findWhere(todos, {id: todoId});

    if (!updatedTodo) {

        res.status(404).json({"error": "No TODO item with this id"})

    }

    //Checking on 'completed' status///////////////////////////////////////
    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        //exists and is a boolean
        console.log("if, completed")
        validAttributes.completed = body.completed;

    } else if(body.hasOwnProperty('completed')) {
        //exists but isn't a boolean
        res.status(400).json({"error": "Completed is not a boolean"})

    } else {
        console.log("else nothing, completed")
    }

    //Checking on 'description' status///////////////////////////////////////
    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        console.log("if, description")
        //exists and is a boolean
        validAttributes.description = body.description;
    } else if(body.hasOwnProperty('description')) {
        //exists but isn't a boolean
        res.status(400).json({"error": "Description is not a string"})
    } else {
        console.log("else nothing, description")
    }


    //updating portion

    _.extend(updatedTodo, validAttributes)


    res.json(updatedTodo);

})

db.sequelize.sync().then(function () {

    app.listen(PORT, function(){
        console.log("Port " + PORT +" is always listening")
    })
})




