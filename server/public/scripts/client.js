$(document).ready(onReady);

function onReady() {
    // click listeners
    $('#submit-button').on('click', handleSubmit);
    $('#todo-item-list').on('click', '.delete-button', handleDelete);
    $('#todo-item-list').on('click', '.task-complete-button', handleUpdateTask);
    
    // refresh DOM w/ to-do items
    getTasks();
}

function handleSubmit() {
    console.log("inside handleSubmit")

    const newTask = {
        taskName: $('#todo-input').val(),
        completeStatus: false
    }

    addTask(newTask);
    $('#todo-input').val("");
}

function handleDelete() {
    console.log("inside handleDelete")
    // .data(param) used as a getter here
    const itemId = $(this).closest('tr').data('id');
    console.log("to delete, id:", itemId);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/deletetask/${itemId}`
    })
        .then((response) => {
            console.log(`Deleted task ID: ${itemId}`);
            // to retrieve latest version of table and rerender DOM
            getTasks();
        })
        .catch((error) => {
            console.log('error on DELETE:', error);
            alert("Unable to delete task at this time.  Please try again later.");
        })
}

function handleUpdateTask() {
    console.log("inside handleUpdateTask")
    const itemId = $(this).closest('tr').data('id');
    console.log("to update completed status, id:", itemId);

    $.ajax

}

function addTask(newTaskObject) {
    console.log("adding task:", newTaskObject)

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTaskObject
    })
        .then((response) => {
            console.log('response from server:', response);
            // run GET's function here
            getTasks();
        })
        .catch((error) => {
            console.log('error caught on POST:', error);
            alert("Unable to add task at this time.  Please try again later.")
        })
}

function getTasks() {
    console.log('GET received from server-side');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
        .then((response) => {
            console.log('received all tasks on client-side:', response)
            renderTasks(response);
        })
        .catch((error) => {
            console.log('error on GET:', error);
        })
}




function renderTasks(tasks) {
    $('#todo-item-list').empty();
    for (let task of tasks) {
        let allTasks = $(`
        <tr>
            <td><button class="task-complete-button">X</button></td>
            <td>${task.task}</td>
            <td><button class="delete-button">Delete</button></td>
        </tr>
        `)
        // for each task, append a new row of the table onto the DOM, and add its ID to the DOM <p> object (only as data, not shown on DOM)
        // .data(param, DB attr) used as a setter here:
        allTasks.data('id', task.id)
        $('#todo-item-list').append(allTasks);
    }
}