import React from "react";

const LoadingSpinner = ({ className = "min-h-screen" }) => {
  return (
    <div
      className={`${className} flex items-center justify-center bg-linear-to-b from-slate-50 to-white`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
};

export default LoadingSpinner;
