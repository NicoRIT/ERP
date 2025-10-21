import React, { useEffect, useState } from "react";
import { studentService } from "../services/api";

import "../styles/Attendance.css";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const studentId = 1; // Replace with actual student ID
      const data = await studentService.getAttendance(studentId);
      setAttendanceData(data);
    };

    fetchAttendance();
  }, []);


  // Function to determine row color based on attendance percentage
  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return "green";
    if (percentage >= 80) return "orange";
    return "red";
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Report</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((subject, index) => (
            <tr key={index} className="attendance-row">
              <td>{subject.subject}</td>
              <td style={{ color: getAttendanceColor(subject.attendance) }}>
                {subject.attendance}%
              </td>
            </tr>
          )) || <tr><td colSpan="2">Loading...</td></tr>}

        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
