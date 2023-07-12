const { Project, Collaboration } = require('../models');

const {
  sendSuccessResponse,
  sendUpdateResponse,
  sendDeleteResponse,
} = require('../utils/response.helper');
const {
  serverResponse,
  notFoundResponse,
} = require('../middlewares/validators/validatorResponse');

const ProjectController = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();

      if (projects.length === 0) {
        return notFoundResponse(res, 'Projects not found');
      }

      return sendSuccessResponse(
        res,
        { projects },
        'Projects fetched successfully'
      );
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  getMyProjects: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const projects = await Collaboration.find({
        userId,
      }).populate('projectId', 'name');

      if (projects.length === 0)
        return notFoundResponse(res, 'No projects found');

      return sendSuccessResponse(
        res,
        { projects },
        'Projects fetched successfully'
      );
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  getProjectById: async (req, res) => {
    const { id } = req.params;

    try {
      const project = await Project.findOne({
        _id: id,
      });

      if (!project) return notFoundResponse(res, 'Project not found');

      return sendSuccessResponse(
        res,
        { project },
        'Project fetched successfully'
      );
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Project not found');
      }

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  createProject: async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
      const project = new Project({ name });

      await project.save();
      const collab = await Collaboration.create({
        userId,
        projectId: project._id,
      });

      return sendSuccessResponse(
        res,
        { project, collab },
        'Project created successfully'
      );
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  updateProject: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const project = await Project.findOneAndUpdate(
        { _id: id },
        { $set: { name } },
        { new: true }
      );

      return sendUpdateResponse(
        res,
        { project },
        'Project updated successfully'
      );
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Project not found');
      }
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  deleteProject: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const deletedproject = await Project.findOneAndDelete({ _id: id });

      if (!deletedproject) {
        return notFoundResponse(res, 'Project not found');
      }

      return sendDeleteResponse(res, 'Project deleted successfully');
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Project not found');
      }

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
};

module.exports = ProjectController;
