// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";
import { getTaskList, addTask, deleteTask, updateTask, updateCompletionStatus } from "./api.js";

//declaring btn, tasklist and predefined style for functional btns.
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const functionalBtns = `<div class="functional-btns">
<img class="del-btn" src="./assets/svg/delete.svg" alt="delete-img">
<img class="edit-btn" src="./assets/svg/pencil.svg" alt = "edit-img">
</div>`;

const confirmBox = document.querySelector(".confirm-box");
const confirmMsgBox = document.querySelector(".confirm-msg-box");
const ul = document.querySelector("#taskList");

const taskBox = document.querySelector("#taskInput");
const preferenceBox = document.querySelector("#preferenceInput");
const tagsBox = document.querySelector(".tags-input");
const dateTimeBox = document.querySelector("#dateTimeInput");
const sortInput = document.querySelector("#sortInput");

const alertBox = document.querySelector(".alert-box");
const messageBox = document.querySelector(".message");
const searchBox = document.querySelector('#searchInput');
const searchSelect = document.querySelector('#search-select');


//🟢loading data in the local Storage.
window.onload = async function () {
  try {
    let tasks = await getTaskList();
    createFunctionalBtns();
    displayTask(tasks);
  } catch (e) {
    console.error(e);
    showAlert("Could not load tasks from server.", "error");
  }
};

//🟢displaying tasks.
function displayTask(tasks) {
  const ul = document.querySelector("#taskList");
  ul.innerHTML = ""; //empty the container before adding the values again.

  tasks.forEach((t) => {
    const newLi = document.createElement("li");
    let textStyle = 'none'

    if (t.completed === true) {
      textStyle = 'line-through';
    }

    let preferenceColor = "black"; // default color
    if (t.preference.toLowerCase() === "high") {
      preferenceColor = " linear-gradient(135deg, #3e0791ff, #563190ff);";
    } else if (t.preference.toLowerCase() === "medium") {
      preferenceColor = "linear-gradient(135deg, #5537aeff, #a75ee8ff);";
    } else if (t.preference.toLowerCase() === "low") {
      preferenceColor = "linear-gradient(135deg, #7C3AED, #A78BFA);";
    }

    newLi.innerHTML = `
  <div class="list-container row d-flex align-items-center p-2">
    <div class="col-12 col-md-9 data-container d-flex flex-wrap gap-2 align-items-center">
      <div class="preference-container p-1 px-2 rounded-5" style="background:${preferenceColor}">${t.preference}</div>
      <div class="time-container p-1 rounded-5 small">${t.dateTime ? new Date(t.dateTime).toLocaleString() : ''}</div>
    </div>

    <div class="d-flex align-items-center text-container py-3 px-3 gap-2">
      <p class="m-0 text-break" style="text-decoration: ${textStyle}">${t.task}</p>
      <div class="tags-container small text-muted">${t.tags.join(" ")}</div>
    </div>

    <div class="btn-container col-12 d-flex">
      <button class="btn primary-btn done-btn">
        ${t.completed === true ? 'Undone' : 'Done'}
      </button>
      ${functionalBtns}
    </div>
  </div>`;


    newLi.id = t._id;//_id
    ul.appendChild(newLi);
  });

  updateAnalyticBox(tasks);
}

//🟢making the list buttons functional.(adding event listener)
async function createFunctionalBtns() {

  //🟢deleting task.
  ul.addEventListener("click", async (e) => {
    try {
      if (e.target.classList.contains("del-btn")) {
        console.log("delete btn clicked");
        const result = await showConfirmBox("Do you want to delete the task?");
        if (result === "yes") {
          confirmMsgBox.innerText = "";
          confirmBox.classList.remove("down");
          const listItem = e.target.closest("li");
          const deleteId = listItem.id;

          await deleteTask(deleteId);

          //displaying after deleting.
          const tasks = await getTaskList();
          displayTask(tasks);
          showAlert("Task Deleted Successfully!", "success");
        }
      }
    } catch (e) {
      console.error(e);
      showAlert("Deletion Error", "error");
    }
  });


  //🟢task done
  ul.addEventListener("click", async (e) => {
    try {
      if (e.target.classList.contains("done-btn")) {
        const listItem = e.target.closest("li");
        const id = listItem.id;

        await updateCompletionStatus(id);// save updates
        const tasks = await getTaskList();//displaying data.
        displayTask(tasks);
      }
    }
    catch (e) {
      showAlert("Unable to mark task as completed", "error");
    }
  });


  //🟢edit tasks
  ul.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-btn")) {
      console.log("inside edit button")
      const listItem = e.target.closest("li");
      const id = listItem.id;

      let tasks = await getTaskList();
      let taskData = null;

      //fetcining data to display in the input boxes.
      for (let task of tasks) {
        if (id === task._id) {
          taskData = task;
          break;
        }
      }

      //display in input box.
      if (taskData) {
        taskBox.value = taskData.task;
        preferenceBox.value = taskData.preference;
        dateTimeBox.value = taskData.dateTime;
        tagsBox.value = taskData.tags;

        taskBox.style.background = "#dac2f0ff";
        taskBox.style.border = "2px solid #c083f6ff";

        preferenceBox.style.background = "#dac2f0ff";
        preferenceBox.style.border = "2px solid #c083f6ff";

        dateTimeBox.style.background = "#dac2f0ff";
        dateTimeBox.style.border = "2px solid #c083f6ff";

        tagsBox.style.background = "#dac2f0ff";
        tagsBox.style.border = "2px solid #c083f6ff";

        const addTaskContainer = document.querySelector('.addTask-container');
        const existing = document.querySelector('.btn-row');

        if (!existing) {
          const newDiv = document.createElement('div');
          newDiv.classList.add('row');
          newDiv.classList.add('g-3');
          newDiv.classList.add('pt-3');
          newDiv.classList.add('btn-row');

          newDiv.innerHTML = `<div class="col-md-6 d-grid">
            <button id="save-btn" class="btn primary-btn purple-btn">
              Save
            </button>
          </div>

          <div class="col-md-6 d-grid">
            <button id="cancel-btn" class="btn primary-btn purple-btn">
              Cancel
            </button>
          </div>`;

          addTaskContainer.insertAdjacentElement('afterend', newDiv);

          const saveBtn = document.querySelector('#save-btn');
          const cancelBtn = document.querySelector('#cancel-btn');

          saveBtn.addEventListener('click', async () => {
            try {
              const preferenceInput = preferenceBox.value;
              const taskInput = taskBox.value.trim();
              const dateTimeInput = dateTimeBox ? dateTimeBox.value : null;
              const tagsInput = tagsBox.value;
              const tagsInputArray = tagsInput ? tagsInput.split(",") : [];

              const updatedData = {
                task: taskInput,
                preference: preferenceInput,
                dateTime: dateTimeInput,
                tags: tagsInputArray,
              }

              await updateTask(id, updatedData);//updating tasks.

              restoreInputBoxes();

              const tasks = await getTaskList();
              sorting(tasks);
              displayTask(tasks);
            } catch (e) {
              console.error(e);
              showAlert("Updation error!", "error");
            }
          });

          cancelBtn.addEventListener('click', () => {
            restoreInputBoxes();
          });
        }
      }
    }
  });
}

//🟢searching.
searchBox.addEventListener("input", async () => {
  try {
    const searchText = searchBox.value.trim();
    const filterValue = searchSelect.value;

    if (!filterValue) throw new Error("Please select filter!");
    console.log("Searching:", searchText, filterValue);

    //getting tasks from backend.
    const tasks = await getTaskList();
    let filteredTasks = tasks;

    if (filterValue === "tags") {
      filteredTasks = tasks.filter(t =>
        Array.isArray(t.tags) &&
        t.tags.some(tag => tag.toLowerCase().includes(searchText))
      );
    }
    else if (filterValue === "title") {
      filteredTasks = tasks.filter(t =>
        t.task && t.task.toLowerCase().includes(searchText)
      );
    }
    else if (filterValue === "preference") {
      filteredTasks = tasks.filter(t =>
        t.preference && t.preference.toLowerCase().includes(searchText)
      );
    }

    console.log("Filtered tasks:", filteredTasks);
    displayTask(filteredTasks);


    //---------------NOT WORKING------------------------
    // const res = await fetch(`/search?text=${encodeURIComponent(searchText)}&filter=${encodeURIComponent(filterValue)}`);
    // if (!res.ok) throw new Error("Can't search");

    // const tasks = await res.json();
    // console.log("Tasks from backend:", tasks);
    // displayTask(tasks);
  } catch (err) {
    showAlert(err.message, 'error');
    console.error(err);
  }
});


//🟢emptying all the boxes after adding input.
function restoreInputBoxes() {
  const btnBox = document.querySelector('.btn-row');
  taskBox.value = "";
  preferenceBox.value = "";
  dateTimeBox.value = "";
  tagsBox.value = "";

  taskBox.style.background = "white";
  taskBox.style.border = "none";

  preferenceBox.style.background = "white";
  preferenceBox.style.border = "none";

  dateTimeBox.style.background = "white";
  dateTimeBox.style.border = "none";

  tagsBox.style.background = "white";
  tagsBox.style.border = "none";
  if (btnBox) btnBox.remove();
}

//🟢Adding new List(event listener)
addBtn.addEventListener("click", async () => {
  const preferenceInput = preferenceBox.value;
  const taskInput = taskBox.value.trim();
  const dateTimeInput = dateTimeBox ? dateTimeBox.value : null;
  const tagsInput = tagsBox.value;
  const tagsInputArray = tagsInput ? tagsInput.split(",") : [];

  if (taskInput === "") {
    showAlert("Please enter the task!", "error");
    return;
  }

  if (preferenceInput === "") {
    showAlert("Please select preference!", "error");
    return;
  }

  if (dateTimeInput) {
    const inputDate = new Date(dateTimeInput + ":00");
    const now = new Date();

    if (inputDate < now) {
      showAlert("Selected time cannot be in the past.", "error");
      return;
    }
  }

  //adding task.
  const taskData = {
    task: taskInput,
    preference: preferenceInput,
    dateTime: dateTimeInput ? new Date(dateTimeInput).toISOString() : null,
    tags: tagsInputArray,
  };
  console.log(taskData);

  await addTask(taskData);

  let tasks = await getTaskList();
  displayTask(tasks);

  showAlert("Task added successfully!", "success");

  restoreInputBoxes();
  return;
});


//sorting on the basis of Time.
function sortByTime(tasks) {
  tasks.sort((a, b) => {
    const aTime = a.dateTime ? new Date(a.dateTime).getTime() : Infinity;
    const bTime = b.dateTime ? new Date(b.dateTime).getTime() : Infinity;
    return aTime - bTime; // earlier time first
  });
  return tasks;
}

//sorting on the basis of preference.
function sortByPreference(tasks) {
  const preferenceOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  tasks.sort((a, b) => {
    const aPref = preferenceOrder[a.preference] || 4;
    const bPref = preferenceOrder[b.preference] || 4;
    return aPref - bPref;
  });
  return tasks;
}

function sorting(tasks) {
  const sortValue = sortInput.value;

  if (sortValue === "time") {
    tasks = sortByTime(tasks);
  } else if (sortValue === "preference") {
    tasks = sortByPreference(tasks);
  }

  //display tasks.
  displayTask(tasks);
}

sortInput.addEventListener("change", async () => {
  try {
    let tasks = await getTaskList();
    sorting(tasks);
  } catch (e) {
    console.log(e);
  }
});

//🟢updating the analytics.
function updateAnalyticBox(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed === true).length;
  const pending = total - completed;

  document.querySelector(".total-tasks .analytic-body").innerText = total;
  document.querySelector(".completed-tasks .analytic-body").innerText = completed;
  document.querySelector(".pending-tasks .analytic-body").innerText = pending;
}

//🟢showing Alert message.
export function showAlert(message, method) {
  messageBox.innerText = message;
  // remove any previous state first
  alertBox.classList.remove("success", "error", "show");
  // add new state
  alertBox.classList.add("show", method === "success" ? "success" : "error");
  setTimeout(() => {
    alertBox.classList.remove("success", "error", "show");
  }, 3000);
}

//🟢showing confirmation box.
function showConfirmBox(message) {
  confirmMsgBox.innerHTML = message; //adding msg to confirm box
  confirmBox.classList.add("up");

  return new Promise((resolve) => {
    const yesBtn = document.querySelector(".yes-btn");
    const noBtn = document.querySelector(".no-btn");

    yesBtn.onclick = () => {
      confirmBox.classList.remove("up");
      confirmBox.classList.add("down");
      resolve("yes");
    };
    noBtn.onclick = () => {
      confirmBox.classList.remove("up");
      confirmBox.classList.add("down");
      resolve("no");
    };
  });
}
