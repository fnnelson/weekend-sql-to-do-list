# Weekend SQL To-Do List

## Description

The project is to create an interactive to-do list to list out to-do list items on the page, allow for new tasks to be added to the list, allow for tasks to be deleted, or for tasks to be updated between complete and incomplete.  When the completed checkbox is checked next to the task, the task's row turns green.  All updates to the list items are to communicate with the database through a server, so that all list items are up to date on the database.

## How Project Was Completed

When user adds new task to list, an express POST request is used to send the info to the server-side and add to the database.  

A GET request sends all the tasks and their updated data back to the client-side and displays the new task with the already-existing tasks on the DOM (along with all of its attributes as well as an invisible ID # that matches the ID in the Database).  

When user clicks Delete on a task, its ID is captured and a DELETE request is used to delete the task from the Database, and the GET updates the DOM again on the client-side.

When user checks the checkbox, its ID is captured and a PUT request is used to update the complete_status (toggles back and forth between true and false), and after updating the Database, the updated info comes back again to re-render the tasks and their updated attributes to the DOM.  When complete_status is true, the checkbox will stay checked and a new class will be added to the row so the task's row will have a green background too.

## Items I Wished I Had Completed

I could not figure out how to utilize Bootstrap.  I used the method described on the Bootstrap website, however I couldn't tell what else I'd need to do other than adding const bootstrap = require('bootstrap').  I also checked multiple Stack Overflow forums which gave very different methods to bring in the module for use, and I couldn't tell if I was using that right either.

For the above reasons, I did not get a chance to either explore Bootstrap toolkits or to get more practice on Git branching.  I hope to understand how to load up Bootstrap's tools and will do Git branching as often as possible going forward to get used to it.