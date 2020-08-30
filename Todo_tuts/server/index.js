
/**
 * This is were we import all our packages
 * express- 
 * cors- cors is used to prevent Cross-Origin Request Block error while we try to communicate from front-end to back-ends
 * mongoose- is there so we can set up a connection with a MongoDB database
 * body-parser- for parsing body of the request to fetch to-do details whenever any post request comes
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let todoModel = require('./todo_schema');

const app = express();

//This is to create a backend server listening on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000")
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * This is to set up a connection to MongoDB
 * 27017 is the default port for MongoDB
 * todoapp is the name of our database
 */
mongoose.connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB');
});
db.on('error', (error) => {
    console.log(error)
});

//Creating a to-do
app.post('/todo/add', (req, res) => {
    let newTodo = new todoModel;
    newTodo.title = req.body.todo;
    newTodo.completed = false;
    newTodo.save((err) => {
        if (err) {
            res.send("Error while adding Todo");
        } else {
            res.send("Todo added");
        }
    })
});

//Route for completed to-dos 
app.get('/todo/completed', (req, res) => {
    todoModel.find({ completed: true }, (err, todos) => {
        if (err) {
            res.send("Error while fetching Todos");
        } else {
            res.json(todos)
        }
    })
})

//Route for uncompleted to-dos
app.get('/todo/uncompleted', (req, res) => {
    todoModel.find({ completed: false }, (err, todos) => {
        if (err) {
            res.send("Error while fetching Todos");
        } else {
            res.json(todos)
        }
    })
})

//Updating a to-do
app.post('/todo/complete/:id', (req, res) => {
    todoModel.findByIdAndUpdate(req.params.id, { completed: true }, (err, todo) => {
        if (!err) {
            res.send("Good Work");
        }
    })
})

//Deleting a to-do
app.delete('/todo/:id', (req, res) => {
    let query = { _id: req.params.id }
    todoModel.deleteOne(query, (err) => {
        if (err) {
            res.send("Error while deleting todo")
        } else {
            res.send("Todo deleted")
        }
    })
})