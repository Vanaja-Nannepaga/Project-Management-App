import React from "react";

const Faq = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans px-4">
    <div className="max-w-4xl w-full bg-white/95 rounded-2xl shadow-2xl p-14 mt-24 mb-14 border border-blue-200">
      <h2 className="text-5xl font-bold text-blue-800 mb-8 drop-shadow">Frequently Asked Questions</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">How do I create a new project?</h3>
        <p className="text-blue-900 text-xl">Go to the dashboard and click on "Create Project". Fill in the details and submit to start managing your new project.</p>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Can I invite team members?</h3>
        <p className="text-blue-900 text-xl">Yes! Open your project, go to the "Team" section, and send invitations via email to your team members.</p>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Is there a way to track progress?</h3>
        <p className="text-blue-900 text-xl">Absolutely. Each project comes with built-in progress tracking and reporting tools available from your project overview.</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">How do I report a bug?</h3>
        <p className="text-blue-900 text-xl">Use the "Report Bug" option inside your project to submit details. Our team will address it as soon as possible.</p>
      </div>
    </div>
  </div>
);

export default Faq;
