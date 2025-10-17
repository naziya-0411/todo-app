import  showAlert  from "./main.js";
import {DOMAIN, PORT} from '../../constants.js';
import fetchAuth from "./interceptor.js";

const BASE_URL = `${DOMAIN}:${PORT}`;

//🟢extracting taskList from database.
async function getTaskList() {
  try {
    console.log(BASE_URL);
    const res = await fetchAuth(`${BASE_URL}`);

    if (!res.ok) throw new Error("Failed to fetch tasks from backend.");

    return await res.json(); //returning tasksList fetched from DB.
  } catch (e) {
    console.error("Error fetching tasks:", e);
    showAlert(`Could not load tasks from server!`, "error");
  }
}

//🟢adding task to database..
async function addTask(taskData) {
  try {
    const res = await fetchAuth(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    // if (!res.ok) throw new Error('Failed to create task');
    showAlert("Task added successfully!", "success");

  } catch (e) {
    console.error("Error creating task:", e);
    showAlert("Could not add task to server", "error");
  }
}

//🟢removing task from database.
async function deleteTask(id) {
  try {
    const res = await fetchAuth(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete task");

    showAlert("Task deleted successfully!", "success");
  } catch (e) {
    console.error("Error deleting task:", e);

    showAlert("Could not delete task from server", "error");
  }
}

//🟢updating tasks.
async function updateTask(id, updatedData) {
  try {
    const res = await fetchAuth(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update task");

    showAlert("Task updated successfully!", "success");
    return;
  } catch (e) {
    console.error("Error updating task:", e);
    showAlert("Could not update task on server", "error");
  }
}

//🟢updating only completion status.
async function updateCompletionStatus(id) {
  try {
    const res = await fetchAuth(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error("Failed to update completion status");
  } catch (e) {
    console.error(e);
    showAlert("Could not update task status", "error");
  }
}

async function searchTask(searchText, searchFilter) {
  try {
    const res = await fetchAuth(
      `${BASE_URL}/search?searchText=${searchText}&searchFilter=${searchFilter}`
    );

    if (!res.ok) {
      throw new Error("Error occurred while sorting");
    }

    return await res.json();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
}

// const res = await fetch(`/search?text=${encodeURIComponent(searchText)}&filter=${encodeURIComponent(filterValue)}`);
async function sortTask(sortFilter) {
  try {
    const res = await fetchAuth(
      `${BASE_URL}/sort?sortFilter=${sortFilter}`
    );

    if (!res.ok) {
      throw new Error("Error occurred while sorting");
    }

    return await res.json();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
}

export {
  getTaskList,
  addTask,
  deleteTask,
  updateTask,
  updateCompletionStatus,
  searchTask,
  sortTask,
};