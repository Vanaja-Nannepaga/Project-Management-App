import React, { useState, useEffect } from "react";
import axios from "../../axios";

export default function TicketDetail({ ticket, onClose }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (ticket?._id) {
      axios
        .get(`/comments/${ticket._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Failed to fetch comments:", err));
    }
  }, [ticket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post(
        `/comments/${ticket._id}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      const res = await axios.get(`/comments/${ticket._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
        <p className="mb-4 text-sm text-gray-700">{ticket.description}</p>

        <h3 className="font-semibold mb-2">Comments</h3>
        <div className="max-h-[200px] overflow-y-auto space-y-2 mb-4">
          {comments.length === 0 && (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
          {comments.map((c) => (
            <div
              key={c._id}
              className="border bg-gray-100 p-2 rounded text-sm"
            >
              <div className="font-medium">
                {c.userId?.name || "User"} •{" "}
                <span className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border p-2 rounded mb-2"
            rows="3"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}

