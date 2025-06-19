import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function Comments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!ticketId) return;
    fetchComments();
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await axios.post(
        `/comments/${ticketId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="mt-1 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Comment
        </button>
      </form>

      <ul className="space-y-1 text-sm text-gray-800">
        {comments.map((comment) => (
          <li key={comment._id} className="border-b py-1">
            <span className="font-semibold">{comment.user?.name || "User"}</span>: {comment.text}
            <div className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

