import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Updated to include '/api' for backend routes

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ============================
   ✅ Authentication Services
============================ */
const authService = {
  login: async (email, password, role) => {
    // Mocked response for login
    return {
      token: 'mocked_token',
      user: { id: 1, email, role },
    };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

/* ============================
   ✅ User Services
============================ */
const userService = {
  getProfile: async () => {
    // Mocked response for user profile
    return {
      id: 1,
      name: "Mock User",
      email: "mock.user@example.com",
    };
  },

  register: async (email, password, role) => {
    // Mocked response for registration
    return {
      id: 1,
      email,
      role,
    };
  },
};

/* ============================
   ✅ Department Services
============================ */
const departmentService = {
  getAllDepartments: async () => {
    // Mocked response for getting all departments
    return [
      { id: 1, name: "Computer Science" },
      { id: 2, name: "Mathematics" },
    ];
  },
};

/* ============================
   ✅ Program Services
============================ */
const programService = {
  getAllPrograms: async () => {
    // Mocked response for getting all programs
    return [
      { id: 1, name: "Bachelor of Science" },
      { id: 2, name: "Bachelor of Arts" },
    ];
  },
};

/* ============================
   ✅ Student Services - MOCKED
============================ */
const studentService = {
  getProfile: async (studentId) => {
    console.log("Mocked API call: getProfile", studentId);
    return {
      id: studentId,
      student_name: "John Doe",
      student_email: "john.doe@example.com",
      student_phone: "123-456-7890",
      department_name: "Computer Science",
      program_name: "Bachelor of Science",
      enrollment_year: 2021
    };
  },

  getCourses: async (studentId) => {
    console.log("Mocked API call: getCourses", studentId);
    return [
      { course_id: 101, course_name: "Introduction to Computer Science", course_code: "CS101", credits: 3, semester: "Fall 2023", status: "Enrolled" },
      { course_id: 102, course_name: "Data Structures and Algorithms", course_code: "CS201", credits: 4, semester: "Spring 2024", status: "Completed" },
      { course_id: 103, course_name: "Database Management Systems", course_code: "CS301", credits: 4, semester: "Fall 2024", status: "Enrolled" }
    ];
  },

  getAttendance: async (studentId) => {
    console.log("Mocked API call: getAttendance", studentId);
    const startDate = new Date("2024-01-01");
    const endDate = new Date();
    const attendanceData = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().slice(0, 10);
      const status = Math.random() < 0.9 ? "Present" : "Absent"; // 90% present
      attendanceData.push({ date: dateString, course_name: "CS101", status: status });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return attendanceData;
  },

  getGrades: async (studentId) => {
    console.log("Mocked API call: getGrades", studentId);
    return [
      { course_name: "Introduction to Computer Science", assessment_type: "Midterm", marks_obtained: 85, max_marks: 100, grade_letter: "A", semester: "Fall 2023" },
      { course_name: "Data Structures and Algorithms", assessment_type: "Final", marks_obtained: 92, max_marks: 100, grade_letter: "A+", semester: "Spring 2024" },
      { course_name: "Database Management Systems", assessment_type: "Midterm", marks_obtained: 78, max_marks: 100, grade_letter: "B", semester: "Fall 2024" }
    ];
  },
};

// ✅ Export all services
export {
  api,
  authService,
  userService,
  departmentService,
  programService,
  studentService
};
