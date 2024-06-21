import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import "./TestDetail.css";
import backgroundImage from "./activity_tracker_bg.webp"; // Import the image

function TestDetail({ test, setSelectedTest }) {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 10;

  useEffect(() => {
    axios.get(`http://localhost:3000/tests/${test.id}`).then((response) => {
      setActivities(response.data);
    });
  }, [test]);

  const markAsComplete = (activityId) => {
    axios
      .post(
        `http://localhost:3000/tests/${test.id}/activities/${activityId}/complete`
      )
      .then((response) => {
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity.id === activityId
              ? { ...activity, completed: !activity.completed }
              : activity
          )
        );
      });
  };

  const resetActivities = () => {
    axios
      .post(`http://localhost:3000/tests/${test.id}/reset`)
      .then((response) => {
        setActivities((prevActivities) =>
          prevActivities.map((activity) => ({
            ...activity,
            completed: false,
          }))
        );
      });
  };

  const completedActivities = activities.filter(
    (activity) => activity.completed
  ).length;
  const totalActivities = activities.length;
  const completionPercentage = (completedActivities / totalActivities) * 100;

  // Pagination logic
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="test-detail"
      style={{ "--bg-image": `url(${backgroundImage})` }}
    >
      <div className="info-boxes">
        <div className="total-activities">
          <p>Total Activities: {totalActivities}</p>
        </div>
        <button
          onClick={() => setSelectedTest(null)}
          className="animated-button"
        >
          Back
        </button>
      </div>
      <div className="content">
        <h1>{test.name}</h1>
        <table>
          <thead>
            <tr>
              <th>Si.No</th>
              <th>Activity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentActivities.map((activity, index) => (
              <tr
                key={activity.id}
                className={`activity-row ${
                  activity.completed ? "completed" : ""
                }`}
              >
                <td>{indexOfFirstActivity + index + 1}</td>
                <td>{activity.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={activity.completed}
                    onChange={() => markAsComplete(activity.id)}
                    className="animated-checkbox"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(activities.length / activitiesPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`pagination-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
      <div className="progress-container">
        <div className="completed-activities">
          <p>Completed Activities: {completedActivities}</p>
        </div>
        <button onClick={resetActivities} className="animated-button">
          Reset
        </button>
        <ProgressBar percentage={completionPercentage} />
      </div>
    </div>
  );
}

export default TestDetail;
