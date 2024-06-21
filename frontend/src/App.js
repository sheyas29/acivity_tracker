import React, { useState, useEffect } from "react";
import "./App.css";
import TestList from "./components/TestList";
import TestDetail from "./components/TestDetail";

function App() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/tests")
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <div className="App">
      {selectedTest ? (
        <TestDetail test={selectedTest} setSelectedTest={setSelectedTest} />
      ) : (
        <TestList tests={tests} setSelectedTest={setSelectedTest} />
      )}
    </div>
  );
}

export default App;
