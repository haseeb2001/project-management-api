const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

const collaborationSchema = new mongoose.Schema({
  userId: {
    type: ObjectID,
    ref: 'User',
    required: true,
  },
  projectId: {
    type: ObjectID,
    ref: 'Project',
    required: true,
  },
});

module.exports = mongoose.model('Collaboration', collaborationSchema);
