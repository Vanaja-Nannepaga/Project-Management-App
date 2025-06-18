import React from "react";

const Contact = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans px-4">
    <div className="max-w-4xl w-full bg-white/95 rounded-2xl shadow-2xl p-14 mt-24 mb-14 border border-blue-200">
      <h2 className="text-5xl font-bold text-blue-800 mb-8 drop-shadow">Contact Us</h2>
      <p className="text-2xl text-blue-900 mb-6">
        We'd love to hear from you! For any questions, support, or feedback, please reach out:
      </p>
      <ul className="text-2xl text-blue-900 mb-8 space-y-2">
        <li><strong>Email:</strong> support@projectmanagementapp.com</li>
        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
        <li><strong>Address:</strong> 123 Collaboration Ave, Suite 400, Productivity City, Country</li>
      </ul>
      <p className="text-2xl text-blue-900">
        Or fill out the contact form on our website, and our team will get back to you promptly.
      </p>
    </div>
  </div>
);

export default Contact;
