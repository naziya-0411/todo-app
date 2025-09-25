// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');
const functionalBtns = `<div class="functional-btns">
            <button class="btn primary-btn done-btn">Done</button>
            <img class="del-btn" src="./assets/svg/delete.svg" alt="delete-img">
            <img class="edit-btn" src="./assets/svg/pencil.svg" alt="pencil-img">
          </div>`

addBtn.addEventListener('click', () => {
    const taskInput = document.querySelector('#taskInput').value.trim();
    const preferenceInput = document.querySelector('#preferenceInput').value.trim();
    const time = document.querySelector('#timeInput').value.toLocaleString();

    if (taskInput === "") {
        showAlert('Please enter the task!', 'error');
        return;
    }
    if (preferenceInput === "") {
        showAlert("Please select preference!", 'error');
        return;
    }

    //adding task in the list.
    const ul = document.querySelector('#taskList');
    const newLi = document.createElement('li');
    newLi.innerHTML = `<h5 contenteditable="true">${preferenceInput} ${taskInput}</h5> 
${functionalBtns}`;

    ul.appendChild(newLi);

    ul.addEventListener('click', (e) => {
        if (e.target.classList.contains('del-btn')) {
            const listItem = e.target.closest('li');
            ul.removeChild(listItem);
            showAlert('Task Deleted Successfully!', 'success');
        }
    });

    ul.addEventListener('click', (e)=>{
        if(e.target.classList.contains('edit-btn')){
            const listItem = e.target.closest('li');

        }
    })

    ul.addEventListener('click', (e)=>{
        if(e.target.classList.contains('done-btn')){
            const listItem= e.target.closest('li');
            const task = listItem.firstElementChild;
            task.style.textDecoration = 'line-through';
        }
    })

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

function sortByTime(){

}

function sortByPreference(){
    const 
}
