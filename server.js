var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();

var PORT = process.env.PORT || 3000;

var todoNextId = 1;

// var todos = [{
//     id: 1,
//     description: 'Call Shelly',
//     completed: false,
// }, {
//     id: 2,
//     description: 'Eat Taco Bell Cravings Deal Package',
//     completed: false,
// }, {
//     id: 3,
//     description: 'Complain',
//     completed: true,
// }];

// {
//     "description": "Call Shelly",
//     "completed": false
// } {
//     "description": "Eat Taco Bell Cravings Deal Package",
//         "completed": false
// } {
//     "description": "Complain",
//         "completed": true
// }

var todos = []

app.use(bodyParser.json());

//GET todos

app.get("/", function(req, res){
    res.send("We are not in Kansas anymore, TODO");
})

app.get("/todos", function(req, res){
    res.json(todos);
})

//GET individual todo

app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    // var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});


    // todos.forEach(function (todo) {
    //
    //     if (todoId === todo.id) {
    //         matchedTodo = todo;
    //     }
    // });

    if (matchedTodo) {
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }

});

// post

app.post("/todos", function(req, res){
    var body = _.pick(req.body, 'description', 'completed')


    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        // res.status(400).send();
        return res.status(400).send();
    }

    body.description = body.description.trim()

    body.id = todoNextId++


    todos.push(body)

    console.log("description: " + body.description, ", completed: " + body.completed, ", id: " + body.id);

    res.json(body);


});

// DELETE

app.delete("/todos/:id", function(req, res){
    var todoId = parseInt(req.params.id, 10)

    // console.log("TODO id: " + todoId)

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

    console.log("TODOid: " + todoId);

    var body = _.pick(req.body, 'description', 'completed')

    console.log(body);

    var updatedTodo = _.findWhere(todos, {id: todoId});

    console.log("updated TODO: " + updatedTodo);

    if (!updatedTodo) {

        console.log("In Outer IF statement");
        res.status(404).json({"error": "No TODO item with this id"})

    } else {

        console.log("In OUTER ELSE statement")

        // var body = _.pick(req.body, 'description', 'completed')

        // console.log("body: " + body);

        if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){

            console.log("In Outer IF statement");

            return res.status(400).send();

        }

        updatedTodo.description = body.description.trim();
        updatedTodo.completed = body.completed;
        // updatedTodo.body.description = body.description.trim();
        // updatedTodo.body.completed = body.completed;

        console.log("Updates: " + updatedTodo.description + ", " + updatedTodo.completed )

        console.log("UPDATED > description: " + body.description, ", completed: " + body.completed);

        res.json(body);

    }

})



app.listen(PORT, function(){
    console.log("Port " + PORT +" is always listening")
})


