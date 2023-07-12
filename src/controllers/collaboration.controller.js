const { Project, Collaboration } = require('../models');
const {
  sendSuccessResponse,
  sendDeleteResponse,
} = require('../utils/response.helper');
const {
  serverResponse,
  notFoundResponse,
} = require('../middlewares/validators/validatorResponse');

const CollaborationController = {
  getMyCollabs: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const collabs = await Collaboration.find({
        userId,
      }).populate('projectId', 'name');

      if (collabs.length === 0)
        return notFoundResponse(res, 'No collabs found');

      return sendSuccessResponse(
        res,
        { collabs },
        'Collabs fetched successfully'
      );
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  getProjectCollabs: async (req, res) => {
    try {
      const { projectId } = req.params;
      const collabs = await Collaboration.find({
        projectId,
      }).populate('userId', 'username');

      if (collabs.length === 0)
        return notFoundResponse(res, 'No collaborators found');

      return sendSuccessResponse(
        res,
        { collabs },
        'Collabs fetched successfully'
      );
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  getCollabById: async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    try {
      const collaboration = await Collaboration.findOne({
        _id: id,
        userId,
      });

      if (!collaboration)
        return notFoundResponse(res, 'Collaboration not found');

      return sendSuccessResponse(
        res,
        { collaboration },
        'Collaboration fetched successfully'
      );
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Collaboration not found');
      }

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  createCollab: async (req, res) => {
    const { projectId, collaboratorId } = req.body;

    try {
      const collab = await Collaboration.create({
        projectId,
        userId: collaboratorId,
      });

      return sendSuccessResponse(
        res,
        { collab },
        'Project created successfully'
      );
    } catch (error) {
      console.log('error: ', error);

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
  deleteCollab: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedcollab = await Collaboration.findOneAndDelete({ _id: id });

      if (!deletedcollab) {
        return notFoundResponse(res, 'Collaboration not found');
      }

      return sendDeleteResponse(res, 'Collaboration deleted successfully');
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return notFoundResponse(res, 'Collaboration not found');
      }

      return serverResponse(res, error.message, 'Internal Server Error');
    }
  },
};

module.exports = CollaborationController;
