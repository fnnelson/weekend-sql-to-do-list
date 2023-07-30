const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

// POST 
router.post('/', (req, res) => {
    // unpacking POST object upon receipt from client-side
    let taskToAdd = req.body;
    // console.log('new task on server side:', taskToAdd);

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
    let queryText = `SELECT * FROM "todo-list" ORDER BY "id";`; // trying to keep them in order when doing the PUT updates
    pool.query(queryText)
        .then((result) => {
            // console.log("all tasks being sent to client:", result.rows);
            // sending all to do list items in object
            res.send(result.rows);
        })
})

// DELETE
router.delete('/deletetask/:id', (req, res) => {
    let taskToDeleteId = req.params.id;
    // console.log("id made it to delete on server side:", taskToDeleteId)

    let queryText = `DELETE FROM "todo-list" WHERE id=$1;`;

    pool.query(queryText, [taskToDeleteId])
        .then((result) => {
            // console.log("task deleted, id:", taskToDeleteId);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log("error making database query:", queryText);
            console.log("error message", error);
            res.sendStatus(500);
        })
})

// PUT
router.put('/updatetask/:id', (req, res) => {
    let taskToUpdateId = req.params.id;
    let updateTaskStatus = req.body.newStatus
    // console.log("id made it to PUT on server side:", taskToUpdateId);
    // console.log("status updated to the server side:", updateTaskStatus);
    const queryText = `UPDATE "todo-list" SET complete_status=$1 WHERE id=$2;`;

    pool.query(queryText, [updateTaskStatus, taskToUpdateId])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log("error making database query:", queryText);
            console.log("error message", error);
            res.sendStatus(500);
        })
})



module.exports = router;