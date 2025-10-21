import { DOMAIN, PORT } from '../../constants.js';
import fetchAuth from "./interceptor.js";

const BASE_URL = `${DOMAIN}:${PORT}`;

export default class TaskAPI{

  getTaskList = async() => {
    try {
      const res = await fetchAuth(`${BASE_URL}`);
      let data;
  
      try {
        data = await res.json();
      } catch {
        data = null;
      }
  
      if (!res.ok) {
        const err = new Error(data?.message || res.statusText || `Error in fetching task from Database`);
        err.status = res.status;
        throw err;
      }
  
      return data;
    } catch (err) {
      throw (err);
    }
  }
  
  addTask = async (taskData) => {
    try {
      const res = await fetchAuth(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
  
      if (!res.ok) {
        const err = new Error(res.statusText || `Error in adding task in database`);
        err.status = res.status;
        throw err;
      }
  
      return;
    } catch (err) {
      throw (err);
    }
  }
  
  deleteTask = async(id) => {
    try {
      const res = await fetchAuth(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        const err = new Error(res.statusText || `Error in deleting task from database.`);
        err.status = res.status;
        throw err;
      }
  
      return;
    } catch (err) {
      throw (err);
    }
  }
  
  updateTask = async(id, updatedData) => {
    try {
      const res = await fetchAuth(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      if (!res.ok) {
        const err = new Error(res.statusText || `Error in updating task`);
        err.status = res.status;
        throw err;
      }
  
      return;
    } catch (err) {
      throw (err);
    }
  }
  
  updateCompletionStatus = async(id) => {
    try {
      const res = await fetchAuth(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
  
      if (!res.ok) {
        const err = new Error(res.statusText || `Error in updating task completion status`);
        err.status = res.status;
        throw err;
      }
  
      return;
    } catch (err) {
      throw (e);
    }
  }
  
  searchTask = async(searchText, searchFilter) => {
    try {
      const res = await fetchAuth(
        `${BASE_URL}/search?searchText=${searchText}&searchFilter=${searchFilter}`
      );
  
      if (!res.ok) {
        const err = new Error(res.statusText || `Error in searching tasks.`);
        err.status = res.status;
        throw err;
      }
  
      return await res.json();
    } catch (e) {
      throw (e);
    }
  }
  
  sortTask = async(sortFilter) => {
    try {
      const res = await fetchAuth(
        `${BASE_URL}/sort?sortFilter=${sortFilter}`
      );
  
      if (!res.ok) {
        const err = new Error(res.statusText || `Error in sorting tasks.`);
        err.status = res.status;
        throw err;
      }
  
      return await res.json();
    } catch (e) {
      throw (e);
    }
  }
}