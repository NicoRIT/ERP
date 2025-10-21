import React, { useState, useEffect } from "react";
import "../styles/Results.css"; // Import the new CSS file

const Results = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Simulating an API call with sample result data
    setTimeout(() => {
      setResults([
        { id: 1, course: "React Basics", grade: "A" },
        { id: 2, course: "Advanced JavaScript", grade: "B+" },
        { id: 3, course: "Database Management", grade: "A-" },
      ]);
    }, 1000);
  }, []);

  // Function to determine the color based on grade
  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "green"; // A, A- 
    if (grade.startsWith("B")) return "blue";  // B, B+
    return "gray"; // Default color
  };

  return (
    <div className="results-container">
      <h2>My Results</h2>
      {results ? (
        <div className="result-list">
          {results.map((result) => (
            <div key={result.id} className="result-card">
              <h3>{result.course}</h3>
              <span className="grade" style={{ color: getGradeColor(result.grade) }}>
                {result.grade}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">Loading results...</p>
      )}
    </div>
  );
};

export default Results;
