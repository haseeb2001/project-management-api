const { Task } = require('../models');
const {
  sendSuccessResponse,
  sendUpdateResponse,
  sendDeleteResponse,
} = require('../utils/response.helper');
const {
  serverResponse,
  notFoundResponse,
} = require('../middlewares/validators/validatorResponse');

const TaskController = {
  getAllTask: async (req, res) => {
    try {
      const tasks = await Task.find();

      if (tasks.length === 0) {
        return notFoundResponse(res, 'Tasks not found');
      }

      return sendSuccessResponse(res, { tasks }, 'Tasks fetched successfully');
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  getMyTasks: async (req, res) => {
    try {
      const { id: userId } = req.user;

      const tasks = await Task.find({
        userId,
      })
        .populate('userId', 'username')
        .populate('projectId', 'name');

      if (tasks.length === 0) return notFoundResponse(res, 'Tasks not found');

      return sendSuccessResponse(res, { tasks }, 'Tasks fetched successfully');
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  getProjectTasks: async (req, res) => {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;

      const tasks = await Task.find({
        projectId,
        userId,
      })
        .populate('userId', 'username')
        .populate('projectId', 'name');

      if (tasks.length === 0) return notFoundResponse(res, 'Tasks not found');

      return sendSuccessResponse(res, { tasks }, 'Tasks fetched successfully');
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  getTaskById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const task = await Task.findOne({
        _id: id,
        userId,
      });

      if (!task) return notFoundResponse(res, 'Task not found');

      return sendSuccessResponse(res, { task }, 'Task fetched successfully');
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Task not found');
      }

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  createTask: async (req, res) => {
    const { title, description, dueDate, priority, projectId, status } =
      req.body;
    let taskAttr = {};

    taskAttr.userId = req.user.id;

    taskAttr = {
      ...taskAttr,
      title,
      description,
      dueDate,
      priority,
      status,
      projectId,
    };
    try {
      const task = new Task(taskAttr);

      await task.save();

      return sendSuccessResponse(res, { task }, 'Task created successfully');
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, priority, projectId } = req.body;
    let updatedAttr = {};
    const userId = req.user.id;
    updatedAttr.userId = userId;
    updatedAttr = {
      ...updatedAttr,
      title,
      description,
      dueDate,
      priority,
      projectId,
    };

    try {
      const task = await Task.findOneAndUpdate(
        { _id: id, userId },
        { $set: updatedAttr },
        { new: true }
      );

      return sendUpdateResponse(res, { task }, 'Task updated successfully');
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Task not found');
      }
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const deletedTask = await Task.findOneAndDelete({ _id: id, userId });

      if (!deletedTask) {
        return notFoundResponse(res, 'Task not found');
      }

      return sendDeleteResponse(res, 'Task deleted successfully');
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Task not found');
      }

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
};

module.exports = TaskController;
