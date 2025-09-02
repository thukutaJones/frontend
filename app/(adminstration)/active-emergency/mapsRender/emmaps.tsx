// StaffActiveEmergencyCard.tsx (partial snippet)
interface Props {
  staffEmergency: any;
  showConfirmComplete: string | null;
  setShowConfirmComplete: (id: string | null) => void;
  handleCompleteEmergency: (id: string) => void;
  isCompleting: boolean;
  onViewMap: (destination: { lat: number; lng: number }) => void; // ✅ new
}

export default function StaffActiveEmergencyCard({
  staffEmergency,
  onViewMap,
  // ...rest
}: Props) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">
        Emergency: {staffEmergency?.type || "Medical Emergency"}
      </h3>
      <p className="text-gray-600">
        Location: {staffEmergency?.location?.address || "Unknown"}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() =>
            onViewMap({
              lat: staffEmergency?.location?.lat,
              lng: staffEmergency?.location?.lng,
            })
          }
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          View on Map
        </button>
      </div>
    </div>
  );
}
