import React from "react";
import { useParams } from "react-router-dom";
import CreateTicketForm from "../CreateTicketForm";

export default function CreateTicketFormPage() {
  const { projectId } = useParams();

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-2 text-center">Let's Fix Something!</h1>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">Create a New Ticket</h2>
        <CreateTicketForm projectId={projectId} />
      </div>
    </div>
  );
}
