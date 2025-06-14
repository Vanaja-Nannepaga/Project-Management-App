const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  teamMembers: [{ type: String }] // Store emails or user IDs
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
