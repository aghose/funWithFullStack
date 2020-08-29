
/**
 * This is were we import all our packages
 * express- 
 * cors- cors is used to prevent Cross-Origin Request Block error while we try to communicate from front-end to back-ends
 * mongoose- is there so we can set up a connection with a MongoDB database
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

//This is to create a backend server listening on port 3000
app.listen(3000, () => {
 console.log("Server started on port 3000")
});

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
})