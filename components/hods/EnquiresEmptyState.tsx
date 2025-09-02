"use client";

import { FiInbox } from "react-icons/fi";

export default function EnquiriesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="rounded-full bg-gray-100 p-6 mb-6">
        <FiInbox className="text-blue-900 text-5xl" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">No Enquiries Yet</h2>
      <p className="text-gray-600 mt-2 max-w-md">
        When enquiries arrive, they will show up here. For now, everything looks
        quiet.
      </p>
    </div>
  );
}
