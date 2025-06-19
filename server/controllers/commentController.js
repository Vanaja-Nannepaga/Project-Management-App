// server/controllers/commentController.js
const Comment = require("../models/Comment");

const getCommentsByTicket = async (req, res) => {
  try {
    const comments = await Comment.find({ ticketId: req.params.ticketId })
      .populate("userId", "name email")
      .sort({ createdAt: 1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

const createComment = async (req, res) => {
  try {
    const { text, parentId } = req.body;
    const ticketId = req.params.ticketId;

    const newComment = new Comment({
      ticketId,
      text,
      userId: req.user.id,
      parentId: parentId || null,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Error posting comment" });
  }
};

module.exports = { getCommentsByTicket, createComment };

