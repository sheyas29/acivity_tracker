import React from "react";

function TestList({ tests, setSelectedTest }) {
  return (
    <div>
      <h1>Test List</h1>
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
