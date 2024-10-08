import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';

const Assignments = ({ studentId }) => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      console.log(`Fetching assignments for student ID: ${studentId}`);
      fetch(`http://localhost:5000/api/student/assignments?student_id=${studentId}`)
        .then(response => {
          console.log('Network response:', response); // Log the response
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Assignments data:', data); // Log the fetched data
          if (data.length === 0) {
            console.log('No assignments found');
          }
          setAssignments(data);
        })
        .catch(error => console.error('Error fetching assignments:', error));
    }
  }, [studentId]);

  const handleAssignmentClick = (assignmentId) => {
    navigate(`/assignment-details/${assignmentId}`);
  };

  return (
    <div className="assignments-container">
      <h2>Your Assignments</h2>
      {assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <div
            key={`${assignment.id}-${index}`}
            className="assignment-card"
            onClick={() => handleAssignmentClick(assignment.id)}
          >
            <h3>{assignment.title}</h3>
            <p><strong>Course:</strong> {assignment.course_title}</p>
            <p>{assignment.description}</p>
            <p><strong>Due Date:</strong> {new Date(assignment.due_date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No assignments found</p>
      )}
    </div>
  );
};

export default Assignments;
