$(document).ready(onReady);

function onReady() {
    // click listeners
    $('#submit-button').on('click', handleSubmit);

    // refresh DOM w/ to-do items
    getTasks();
}

function handleSubmit(event) {
    console.log("inside handleSubmit")
    event.preventDefault();
    const newTask = {
        taskName: $('#todo-input').val(),
        completeStatus: false
    }
    addTask(newTask);
    $('#todo-input').val("");
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
        <p>
        <button>X</button>
        ${task.task}
        </p>
`)
        // for each task, append a new row of the table onto the DOM, and add its ID to the DOM <p> object (only as data, not shown on DOM)
        // .data(param, DB attr) used as a setter here:
        allTasks.data('id', task.id)
        $('#todo-item-list').append(allTasks);
    }
}