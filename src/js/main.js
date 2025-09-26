// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//loading data in the local Storage.
window.onload = function () {
    displayTask();
    createFunctionalBtns();
}

//declaring btn, tasklist and predefined style for functional btns.
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');
const functionalBtns = `<div class="functional-btns">
            <button class="btn primary-btn done-btn">Done</button>
            <img class="del-btn" src="./assets/svg/delete.svg" alt="delete-img">
            </div>`
            const confirmBox = document.querySelector('.confirm-box');
            const confirmMsgBox = document.querySelector('.confirm-msg-box');
            const preferenceInput = document.querySelector('#preferenceInput').value;
            const ul = document.querySelector('#taskList');


//making the list buttons functional.
function createFunctionalBtns(){
    //deleting task.
    ul.addEventListener('click', async (e) => {
        try {
            if (e.target.classList.contains('del-btn')) {
                const result = await showConfirmBox('Do you want to delete the task?');
                if (result === "yes") {
                    confirmMsgBox.innerText = "";
                    confirmBox.classList.remove('down');
                    const listItem = e.target.closest('li');
                    ul.removeChild(listItem);

                    
                    showAlert('Task Deleted Successfully!', 'success');
                }
            }
        }
        catch (e) {
            console.log(e)
            console.log("something went wrong while deleting.");
        }
    });

    //task done
    ul.addEventListener('click', (e) => {
        if (e.target.classList.contains('done-btn')) {
            const listItem = e.target.closest('li');
            const task = listItem.firstElementChild;
            task.style.textDecoration = 'line-through';
        }
    })
}


//Adding new List.
addBtn.addEventListener('click', () => {
    const taskInput = document.querySelector('#taskInput').value.trim();
    const timeInput = document.querySelector('#timeInput').value.toLocaleString();
    const tagsInput = document.querySelector('.tags-input').value.trim();
    const tagsInputArray = tagsInput.split(',');

    if (taskInput === "") {
        showAlert('Please enter the task!', 'error');
        return;
    }
    if (preferenceInput === "") {
        showAlert("Please select preference!", 'error');
        return;
    }

    //adding task.
    const newLi = document.createElement('li');
    newLi.innerHTML = `<p class="m-0 task-font">${preferenceInput} ${taskInput} ${tagsInputArray.join(" ")}</p> 
    ${functionalBtns}`;
    ul.appendChild(newLi);
    createFunctionalBtns();
    
    //storing data in localStorage.
    const taskData = {
        task: taskInput,
        preference: preferenceInput,
        time: timeInput,
        tags: tagsInputArray
    }
    const id = Date.now();
    newLi.id = id;
    storeInLocalStorage(taskData, id);
    
    showAlert("Task added successfully!", 'success');
    return;
});


const alertBox = document.querySelector('.alert-box')
const messageBox = document.querySelector('.message');

function showAlert(message, method) {
    messageBox.innerText = message;

    if (method === 'success') {
        alertBox.classList.add('success');
    }
    else {
        alertBox.classList.add('error');
    }
    alertBox.classList.add('show');

    setTimeout(() => {
        if (alertBox.classList.contains('success')) {
            alertBox.classList.remove('success');
        }
        if (alertBox.classList.contains('error')) {
            alertBox.classList.remove('error');
        }
        alertBox.classList.remove('show')
    }, 3000);
}

function showConfirmBox(message) {
    confirmMsgBox.innerHTML = message;//adding msg to confirm box
    confirmBox.classList.add('up');

    return new Promise((resolve) => {
        const yesBtn = document.querySelector('.yes-btn');
        const noBtn = document.querySelector('.no-btn');

        yesBtn.onclick = () => {
            confirmBox.classList.remove('up');
            confirmBox.classList.add('down');
            resolve("yes");
        }
        noBtn.onclick = () => {
            confirmBox.classList.remove('up');
            confirmBox.classList.add('down');
            resolve("no");
        }
    });
}

//sorting on the basis of preference.
const preferenceSelect = document.querySelector('.preferenceInput');
preferenceSelect.addEventListener('change', () => {
    const preferenceVal = preferenceSelect.value.trim.toLowerCase();
    // if(preferenceVal === "high")

});

//sorting on the basis of Time.
const sortInput = document.querySelector('#sortInput');
sortInput.addEventListener('change', () => {
    const sortValue = sortInput.value;
    if (sortValue === "time") {
        sortByTime();
    }
    else if (sortValue === "preference") {
        sortByPreference();
    }
    else {
        sortByIndex();
    }
})

function sortByTime() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.sort((a, b) => b.time - a.time);
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function sortByPreference() {

}

function sortByIndex() {

}

function storeInLocalStorage(taskData, id) {
    console.log("inside local storage")
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};

    //using a map to store the id against object 
    tasks[id] = taskData;
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteFromLocalStorage(id){

}

function displayTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    console.log(tasks);
    const ul = document.querySelector('#taskList');

    for (let id in tasks) {
        const t = tasks[id];
        const newLi = document.createElement('li');
        newLi.innerHTML = `<p class="m-0 task-font">${t.preference} ${t.task} ${t.tags.join(" ")}</p> 
        ${functionalBtns}`;
        newLi.id = id;
        ul.appendChild(newLi);
    }

    createFunctionalBtns();
}


