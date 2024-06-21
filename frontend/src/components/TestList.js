import React from "react";
import "./TestList.css";

function TestList({ tests, setSelectedTest }) {
  return (
    <div className="test-list">
      <h1>Tests</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.id} onClick={() => setSelectedTest(test)}>
            {test.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestList;
