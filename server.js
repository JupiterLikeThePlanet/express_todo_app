var express = require('express');

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [{
    id: 1,
    description: 'Call Shelly',
    completed: false,
}, {
    id: 2,
    description: 'Eat Taco Bell',
    completed: false,
}, {
    id: 3,
    description: 'Complain',
    completed: true,
}];

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
    var matchedTodo;


    todos.forEach(function (todo) {

        if (todoId === todo.id) {
            matchedTodo = todo;
        }
    });

    if (matchedTodo) {
        res.json(matchedTodo);
    }else{
        res.status(400).send();
    }

});


app.listen(PORT, function(){
    console.log("Port " + PORT +" is always listening")
})


