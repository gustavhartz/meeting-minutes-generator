import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-gray-300 border-solid h-12 w-12"></div>
    </div>
  );
};

export default Spinner;
