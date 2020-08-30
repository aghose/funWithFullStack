
const express = require('express');
const cors = require('cors');

//initialize app
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const posts = require('./routes/api/posts');

//Any route that uses api/posts will be rerouted to posts
app.use('/api/posts', posts);

//Port will be process.env.PORT in Heroku or 5000 for local port
const port = process.env.PORT || 5000;

//This will start the server
app.listen(port, () => console.log(`Server started on port ${port}`));