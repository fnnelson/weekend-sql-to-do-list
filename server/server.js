// Setup Express
const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/task.router.js');
const app = express();

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect route from server to router
app.use('/tasks', tasksRouter);

// Serve up static files
app.use(express.static('server/public'));

// Listen to PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🙉 on PORT", PORT);
});