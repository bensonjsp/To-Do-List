function getToDo() { // load tasks that are saved

    // Check if there is stored data in localStorage
    const storedData = localStorage.getItem('tableData');

    // If there is stored data, set the table content
    if (storedData) {
        document.getElementById('toDoTable').innerHTML = storedData;
    }

}

// Function to save the current table content to localStorage
function saveTableData() {
    const tableContent = document.getElementById('toDoTable').innerHTML;
    localStorage.setItem('tableData', tableContent);
}

// Call the saveTableData function whenever the page is about to be unloaded (refresh or close)
window.addEventListener('beforeunload', saveTableData);

function addTask() {
    var taskList = document.getElementById("allTasks");
    // console.log(taskList);
    var taskName = document.getElementById("addToDo").value;
    var completionDate = document.getElementById("addToDoDate").value;

    if (taskName.length == 0){ // MUST have a task name, at least
        var inputError = document.getElementById("inputError");
        // console.log(inputError.innerText);
        if (inputError.innerText.length == 0) {
            let txt = document.createTextNode("Add a task name");
            inputError.appendChild(txt);
        }
    }

    else if (taskName.length != 0) { // OKAY conditions, a) Task name only, b) Task name + completion date
        // retrieve number of rows
        var i = taskList.rows.length;
        // console.log(i);
        i++;
        // CLEAR errors, if any
        let inputError = document.getElementById("inputError");
        inputError.innerHTML = "";

        // INSERT into table
        let tr = taskList.insertRow();
        tr.setAttribute('id', 'task' + i);
        let td = tr.insertCell();

        if (completionDate.length == 0){ // no date, set as NIL completion date
            let text = document.createTextNode("NIL");
            td.appendChild(text);
        }
        else {
            let text = document.createTextNode(completionDate);
            td.appendChild(text);
        }

        // CREATE Task Name
        td = tr.insertCell();
        let text = document.createTextNode(taskName);
        td.appendChild(text);

        // CREATE checkbox
        td = tr.insertCell();
        var chk = document.createElement('input');
        chk.setAttribute('type', 'checkbox');
        chk.setAttribute('onchange', "removeTask(this)");

        td.appendChild(chk);

        // CLEAR INPUT FIELD
        document.getElementById("addToDo").value = "";

        // UPDATE STORAGE
        saveTableData();
    }

    // console.log(taskList);
    // console.log(taskName.length);
    // console.log(completionDate);

}

function removeTask(task) {
    if (task.checked == true) { // DELETE by ID
        var taskID = task.parentNode.parentNode.id;
        // console.log(taskID);

        // FUTURE UPDATE: Remove this task and add to "Completed Tasks"
        
        document.getElementById(taskID).remove();
        
    }
}

function enterTask(event){ // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
        addTask();
    }

}