"use client";

import { FiMessageCircle } from "react-icons/fi";

export default function NoActivePatient() {
  return (
    <div className="flex flex-col h-[calc(100vh-70px)] w-full items-center justify-center text-center px-4">
      <div className="rounded-full bg-gray-100 p-6 mb-6">
        <FiMessageCircle className="text-blue-900 text-5xl" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">
        Select a Conversation
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Choose a patient from the list to view and respond to their enquiries.
      </p>
    </div>
  );
}
