export const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr)?.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (dateStr: string) => {
  return new Date(`${dateStr}`)?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
