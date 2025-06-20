import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between font-sans overflow-hidden">
      {/* Background (matches login page) */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 py-16 sm:py-20">
        <h2 className="text-1b1111 text-3xl sm:text-4xl font-extrabold mb-4 text-center">Contact Us</h2>
        <p className="text-7f7b7b/80 max-w-2xl text-center mb-10 px-2">
          We'd love to hear from you! Reach out for support, feedback, or collaboration.
        </p>

        <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Info */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex items-start gap-4">
              <FiMapPin className="text-3xl text-indigo-600 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-gray-800">Address</h4>
                <p className="text-gray-700">4671 Sugar Camp Road, Owatonna, Minnesota, 55060</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiPhone className="text-2xl text-indigo-600 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-gray-800">Phone</h4>
                <p className="text-gray-700">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiMail className="text-2xl text-indigo-600 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-gray-800">Email</h4>
                <p className="text-gray-700">support@projectmanagementapp.com</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Send Message</h3>

            {submitted && (
              <div className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 text-sm px-4 py-2 rounded-lg mb-2">
                <FiCheckCircle size={18} />
                Message sent, wait for response!
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Type your Message..."
              rows={4}
              className="border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-4 left-4 bg-white/80 hover:bg-white text-blue-800 font-semibold px-4 py-2 rounded-lg shadow transition duration-200 z-20"
      >
        ← Back
      </button>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-3 bg-black/30 text-cyan-100 font-semibold shadow-inner text-sm">
        &copy; 2025 Project Management App. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;

