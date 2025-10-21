import { taskModel } from '../models/taskDb.js';

export default class taskController {
  getAllTasks = async (req, res, next) => {
    try {
      const userId = req.user;
      console.log(userId);

      const data = await taskModel.find({ user: userId });

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "No tasks found for this user.",
        });
      }

      return await res.status(200).json({ success: true, data });
    } catch (e) {
      next(e);
    }
  };

  addNewTask = async (req, res, next) => {
    try {
      const user = req.user;

      await taskModel.create({ user, ...req.body });

      res.status(201).json({ success: true, message: `task added successfully!` });
    } catch (e) {
      next(e);
    }
  };

  updateCompletionStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'Missing task ID' });


      const prevItem = await taskModel.findById(id);

      if (!prevItem) {
        res.status(404).json({ success: false, message: `Unable to find task!` })
      }

      const updatedItem = await taskModel.findByIdAndUpdate(
        id,
        { $set: { isCompleted: !prevItem.isCompleted } },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: 'failed to update task!',
        });
      }

      return res.status(200).json({ success: false, message: `task updated successfully!` });
    } catch (e) {
      next(e);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedTask = await taskModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: 'failed to update task!',
        });
      }

      return res.status(200).json({ success: false, message: `task updated successfully!` });

    } catch (e) {
      next(e);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const { id } = req.params;

      const delItem = await taskModel.findByIdAndDelete(id);

      if (!delItem) {
        return res.status(404).json({
          success: false,
          message: 'Item to be deleted not found',
        });
      }

      res.status(204).json({ message: `task deleted successfully!` });
    } catch (e) {
      next(e);
    }
  };

  sortTask = async (req, res, next) => {
    try {
      console.log('inside backend sorting');
      const sortFilter = req.query.sortFilter;
      const user = req.user;

      console.log(sortFilter);

      let filteredTasks = null;

      if (sortFilter === 'pending') {
        filteredTasks = await taskModel.find({ $and: [{ isCompleted: false }, { user }] });
      } else if (sortFilter === 'completed') {
        filteredTasks = await taskModel.find({ $and: [{ isCompleted: true }, { user }] });
      }

      if (!filteredTasks) {
        throw new Error('cannot fetch sorted tasks');
      }

      console.log('this is filtered tasks', filteredTasks);
      return await res.json(filteredTasks);
    } catch (e) {
      next(e);
    }
  };

  searchTask = async (req, res, next) => {
    try {
      let { searchText, searchFilter } = req.query;
      const user = req.user;

      searchText = searchText.toLowerCase();

      console.log(searchFilter, searchText);

      const filteredTasks = await taskModel.find({
        $and: [
          {
            $or: [
              { task: { $regex: searchText, $options: 'i' } },
              { preference: { $regex: searchText, $options: 'i' } },
              { tags: { $elemMatch: { $regex: searchText, $options: 'i' } } },
            ],
          },
          { user }
        ]
      });

      if (!filteredTasks) {
        throw new Error('cannot fetch searched tasks');
      }
      console.log('this is filtered tasks', filteredTasks);
      return await res.json(filteredTasks);
    } catch (e) {
      next(e);
    }
  };
}