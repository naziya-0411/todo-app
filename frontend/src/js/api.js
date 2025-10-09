
import {showAlert} from './main.js'

//🟢extracting taskList from database.
async function getTaskList() {
    try {
        const res = await fetch('http://localhost:8000');
        if (!res.ok) throw new Error("Failed to fetch tasks from backend.");
        return await res.json();//returning tasksList fetched from DB.
    }
    catch (e) {
        console.error("Error fetching tasks:", e);
        showAlert(`Could not load tasks from server!`, 'error');
    }
}

//🟢adding task to database..
async function addTask(taskData) {
    try {
        const res = await fetch('http://localhost:8000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskData })
        });
        console.log("this is a response", res);
        // if (!res.ok) throw new Error('Failed to create task');
        showAlert('Task added successfully!', 'success');
    } catch (e) {
        console.error('Error creating task:', e);
        showAlert('Could not add task to server', 'error');
    }
}

//🟢removing task from database.
async function deleteTask(id) {
    try {
        const res = await fetch(`http://localhost:8000/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error("Failed to delete task");
        showAlert('Task deleted successfully!', 'success');
    }
    catch (e) {
        console.error('Error deleting task:', e);
        showAlert('Could not delete task from server', 'error');
    }
}

//🟢updating tasks.
async function updateTask(id, updatedData) {
    try {
        const res = await fetch(`http://localhost:8000/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: updatedData.task,
                preference: updatedData.preference,
                // dateTime: updatedData.dateTime,
                tags: updatedData.tags,
                completed: updatedData.completed,
            })
        });
        if (!res.ok) throw new Error('Failed to update task');
        showAlert('Task updated successfully!', 'success');
        return;
    }
    catch (e) {
        console.error('Error updating task:', e);
        showAlert('Could not update task on server', 'error');
    }
}


//🟢updating only completion status.
async function updateCompletionStatus(id) {
    try {
        const res = await fetch(`http://localhost:8000/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (!res.ok) throw new Error('Failed to update completion status');
    } catch (e) {
        console.error(e);
        showAlert('Could not update task status', 'error');
    }
}

export { getTaskList, addTask, deleteTask, updateTask, updateCompletionStatus};


