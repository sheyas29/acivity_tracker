import React from "react";
import "./ProgressBar.css";

function ProgressBar({ percentage }) {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ height: `${percentage}%` }}>
        <div
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {Math.round(percentage)}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
