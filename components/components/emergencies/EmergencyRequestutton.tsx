import React from "react";
import { RiAlarmWarningLine, RiNavigationLine } from "react-icons/ri";
import FastBouncingDots from "../BouncingAnimation";

const EmergencyRequestutton = ({
  handleEmergencyRequest,
  isLoading,
}: {
  handleEmergencyRequest: any;
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(85vh-100px)]">
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={handleEmergencyRequest}
          disabled={isLoading}
          className="bg-red-600 p-8 rounded-full border-2 border-gray-50 hover:scale-105"
        >
          {isLoading ? (
            <div className="w-32 h-32 flex items-center justify-center">
              <FastBouncingDots />
            </div>
          ) : (
            <RiAlarmWarningLine className="w-32 h-32 text-white" />
          )}
        </button>
        <p className="text-gray-600 text-center mt-4 text-xs">
          Press the button above to send an emergency request. Our medical team
          will be notified immediately.
        </p>
        <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
          <p className="text-sm text-yellow-800 text-center">
            <RiNavigationLine className="inline w-4 h-4 mr-1" />
            Your location will be automatically shared with our medical team
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequestutton;
