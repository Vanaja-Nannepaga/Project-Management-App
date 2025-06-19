import React, { useEffect, useState } from "react";
import axios from "../../axios";


const TicketDetail = ({ ticket, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${ticket._id}`, {
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
      await axios.post(`/comments/${ticket._id}`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="bg-white border p-4 rounded shadow mt-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Comments</h3>
        <button onClick={onClose} className="text-red-600 text-sm">✖ Close</button>
      </div>

      <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto">
        {comments.map((c) => (
          <div key={c._id} className="bg-gray-100 p-2 rounded">
            <p className="text-sm">{c.text}</p>
            <span className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 mt-1 rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default TicketDetail;

