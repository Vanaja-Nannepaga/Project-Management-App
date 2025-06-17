const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
 teamMembers: [
  {
    name: String,
    email: String
  }
],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
