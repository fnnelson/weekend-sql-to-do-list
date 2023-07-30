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
    // console.log("inside handleDelete")
    // .data(param) used as a getter here
    const itemId = $(this).closest('tr').data('id');
    // console.log("to delete, id:", itemId);

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
    // console.log("inside handleUpdateTask")
    const itemId = $(this).closest('tr').data('id');
    const currentCompleteStatus = $(this).data('complete_status');
    // console.log("to update completed status, id:", itemId);
    // console.log("to update completed status, status:", currentCompleteStatus);

    $.ajax({
        method: 'PUT',
        url: `/tasks/updatetask/${itemId}`,
        data: { newStatus: !currentCompleteStatus } // this is switching the current complete status to be the opposite boolean using !
    })
        .then((response) => {
            console.log(`success PUT for id: ${itemId}`);
            // to retrieve latest version of table with updates and rerender DOM
            getTasks();
        })
        .catch((error) => {
            console.log('error on PUT:', error);
            alert("Unable to update task at this time.  Please try again later.");
        })

}

function addTask(newTaskObject) {
    // console.log("adding task:", newTaskObject)

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

function getTasks(event) {
    // console.log('GET received from server-side');

    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
        .then((response) => {
            // console.log('received all tasks on client-side:', response)
            renderTasks(response);
        })
        .catch((error) => {
            console.log('error on GET:', error);
        })
}




function renderTasks(tasks) {
    $('#todo-item-list').empty();
    let checkedStatus;
    for (let task of tasks) {

        // for some reason the checkbox wasn't staying checked when clicking on it, possibly due to re-rendering the DOM upon refresh, so this conditional was used
        if (task.complete_status == true) {
            checkedStatus = "checked";
        } else if (task.complete_status == false) {
            checkedStatus = "";
        }

        let taskToBeAppended = $(`
        <tr>
            <td><span>
            <input type="checkbox" class="task-complete-button" data-complete_status="${task.complete_status}" ${checkedStatus}>
            </span></td>
            <td><span>${task.task}</span></td>
            <td><span><button class="delete-button">Delete</button></span></td>
        </tr>
        `)
        // for each task, append a new row of the table onto the DOM, and add its ID to the DOM <p> object (only as data, not shown on DOM)
        // .data(param, DB attr) used as a setter here:
        taskToBeAppended.data('id', task.id)

        // here I'm saying if the complete_status is true, to add class of complete to the <tr>, so we can target the td's within to change the background color
        if (task.complete_status == true) {
            taskToBeAppended.addClass('complete')
        } else if (task.complete_status == false) {
            taskToBeAppended.removeClass('complete')
        }
        // append each task of the array of tasks sent from the DB
        $('#todo-item-list').append(taskToBeAppended);
    }
}