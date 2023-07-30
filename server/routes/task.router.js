const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

// POST 
router.post('/', (req, res) => {
    // unpacking POST object upon receipt from client-side
    let taskToAdd = req.body;
    console.log('new task on server side:', taskToAdd);

    // SQL command to add item into table, with task and complete_status attributes
    let queryText = `INSERT INTO "todo-list" ("task", "complete_status") VALUES ($1, $2);`;

    // using pg query method to throw properties from array into 1 and 2 spots of SQL query
    pool.query(queryText, [taskToAdd.taskName, taskToAdd.completeStatus])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in adding new task', error);
            res.sendStatus(500);
        });
});

// GET
router.get('/', (req, res) => {
    // 
    let queryText = `SELECT * FROM "todo-list" ORDER BY "id";`;
    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            // sending all to do list items in object
            res.send(result.rows);
        })
})

module.exports = router;