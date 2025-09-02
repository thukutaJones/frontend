const FastBouncingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <span
        className="w-2 h-2 bg-white rounded-full bounce-fast"
        style={{ animationDelay: "-0.2s" }}
      ></span>
      <span
        className="w-2 h-2 bg-white rounded-full bounce-fast"
        style={{ animationDelay: "-0.1s" }}
      ></span>
      <span className="w-2 h-2 bg-white rounded-full bounce-fast"></span>
    </div>
  );
};

export default FastBouncingDots;
