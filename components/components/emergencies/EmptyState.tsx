import React from "react";
import { RiCheckLine } from "react-icons/ri";

const EmptyState = () => {
  return (
    <div className="text-center py-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-3xl mb-4">
        <RiCheckLine className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
      <p className="text-gray-600">No active emergencies at the moment.</p>
    </div>
  );
};

export default EmptyState;
