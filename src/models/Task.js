const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  userId: {
    type: ObjectID,
    ref: 'User',
    required: true,
  },
  projectId: {
    type: ObjectID,
    ref: 'Project',
  },
});

module.exports = mongoose.model('Task', taskSchema);
