
import React from 'react';

const Watermark = () => {
  return (
    <div className="fixed bottom-4 right-4 z-10 pointer-events-none select-none">
      <span className="text-xs text-gray-400/60 font-light tracking-wide">
        Team CodeCraft 2025
      </span>
    </div>
  );
};

export default Watermark;
