import { taskModel } from '../models/taskDb.js';

//fetching all tasks.
const getAllTasks = async (req, res, next) => {
  try {
    const data = await taskModel.find();
    if (!data) {
      throw new Error('Failed to read task List');
    }
    return await res.json(data);
  } catch (e) {
    next(e);
    res.status(500).json({ error: `Failed to read tasks ${e}` });
  }
};

const addNewTask = async (req, res, next) => {
  try {
    const { taskData } = req.body;

    const newTask = {
      id: new Date().getTime(),
      ...taskData,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log('newTAsks created', newTask);
    await taskModel.create(newTask);
    res.status(201).json();
  } catch (e) {
    next(e);
  }
};

const updateCompletionStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing task ID' });

    const prevItem = await taskModel.findById(id);

    if (!prevItem) throw new Error('Cannot Find Item!');

    const updatedItem = await taskModel.findByIdAndUpdate(
      id,
      { $set: { isCompleted: !prevItem.isCompleted } },
      { new: true }
    );
    if (!updatedItem) {
      throw new Error('Failed to update the completion status');
    }

    return res.status(200).json({ message: 'isCompleted' });
  } catch (e) {
    next(e);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { task, preference, tags, isCompleted } = req.body;

    let updatedFields = {
      task,
      preference,
      tags,
      isCompleted,
    };

    updatedFields.updatedAt = new Date().toISOString();

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      success: 'Task updated successfully!',
      updatedTask,
    });
  } catch (e) {
    next(e);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const delItem = await taskModel.findByIdAndDelete(id);
    if (!delItem) {
      throw new Error('Item to be deleted not found');
    }

    res.status(204).json({ message: `task deleted successfully!` });
  } catch (e) {
    next(e);
  }
};

const sortTask = async (req, res, next) => {
  try {
    let { sortFilter } = req.query;
    let filteredTasks = null;

    if (sortFilter === 'pending') {
      filteredTasks = await taskModel.find({
        $match: [{ isCompleted: false }],
      });
    } else if (sortFilter === 'completed') {
      filteredTasks = await taskModel.find({ $match: [{ isCompleted: true }] });
    }

    if (!filteredTasks) {
      throw new Error('cannot fetch sorted tasks');
    }
    return filteredTasks;
  } catch (e) {
    next(e);
  }
};

const searchTask = async (req, res, next) => {
  // try {
  //   let { searchText, searchFilter } = req.query;
  //   searchText = searchText.toLowerCase();
  //   const filteredTasks = await taskModel.find(query);
  //   if (!filteredTasks) {
  //     throw new Error('Error occured while searching!');
  //   }
  //   return res.status(200).json(filteredTasks);
  // } catch (e) {
  //  next(e);
  // }
};

export {
  getAllTasks,
  addNewTask,
  updateCompletionStatus,
  updateTask,
  deleteTask,
  sortTask,
  searchTask,
};
