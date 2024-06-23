import React, { useState, useEffect } from "react";
import TestList from "./components/TestList";
import TestDetail from "./components/TestDetail";
import "./App.css";

function App() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  // Replace localhost with your local IP address
  const localIPAddress = "192.168.0.104"; // Replace with your actual IP address

  useEffect(() => {
    fetch(`http://${localIPAddress}:3000/tests`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTests(data))
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [localIPAddress]);

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
