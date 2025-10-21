-- 1. Create Database and Tables
DROP DATABASE IF EXISTS erp_main;
CREATE DATABASE erp_main;
USE erp_main;

-- Create Role_Main Table
CREATE TABLE Role_Main (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create User_Main Table (Fixed table name)
CREATE TABLE User_Main (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Role_Main(role_id)
);

-- Create Departments Table
CREATE TABLE Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) UNIQUE NOT NULL
);

-- Create Programs Table
CREATE TABLE Programs (
    program_id INT PRIMARY KEY AUTO_INCREMENT,
    program_name VARCHAR(100) UNIQUE NOT NULL
);

-- Create Admin Table
CREATE TABLE Admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_name VARCHAR(100) NOT NULL,
    admin_email VARCHAR(100) UNIQUE NOT NULL,
    admin_phone VARCHAR(15),
    role_id INT DEFAULT 1,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Role_Main(role_id)
);

-- Create Office_Admin Table
CREATE TABLE Office_Admin (
    office_admin_id INT PRIMARY KEY AUTO_INCREMENT,
    office_admin_name VARCHAR(100) NOT NULL,
    office_admin_email VARCHAR(100) UNIQUE NOT NULL,
    office_admin_phone VARCHAR(15),
    office_name VARCHAR(100),
    role_id INT DEFAULT 5,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Role_Main(role_id)
);

-- Create Dept_Admin Table
CREATE TABLE Dept_Admin (
    dept_admin_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_admin_name VARCHAR(100) NOT NULL,
    dept_admin_email VARCHAR(100) UNIQUE NOT NULL,
    dept_admin_phone VARCHAR(15),
    department_id INT,
    role_id INT DEFAULT 4,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (role_id) REFERENCES Role_Main(role_id)
);

-- Create Faculty Table
CREATE TABLE Faculty (
    faculty_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_name VARCHAR(100) NOT NULL,
    faculty_email VARCHAR(100) UNIQUE NOT NULL,
    faculty_phone VARCHAR(15),
    department_id INT,
    role_id INT DEFAULT 2,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (role_id) REFERENCES Role_Main(role_id)
);

-- Create Student Table
CREATE TABLE Student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    student_email VARCHAR(100) UNIQUE NOT NULL,
    student_phone VARCHAR(15),
    enrollment_year YEAR,
    department_id INT,
    program_id INT,
    role_id INT DEFAULT 3,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (program_id) REFERENCES Programs(program_id),
    FOREIGN KEY (role_id) REFERENCES Role_Main(role_id)
);

-- Create Courses Table
CREATE TABLE Courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    department_id INT,
    program_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (program_id) REFERENCES Programs(program_id)
);

-- 2. Insert Base Data
-- Insert Roles
INSERT INTO Role_Main (role_name) 
VALUES 
    ('Admin'),
    ('Faculty'),
    ('Student'),
    ('Dept Admin'),
    ('Main Office Admin'),
    ('Main Office User');

-- Insert Departments
INSERT INTO Departments (department_name) VALUES
('Computer Engineering'),
('Information Technology'),
('Electronics & Computer Engineering'),
('Mechanical & Automation Engineering'),
('General (Science & Humanities)');

-- Insert Programs
INSERT INTO Programs (program_name) VALUES
('Computer Engineering'),
('Information Technology'),
('Electronics & Computer Engineering'),
('Mechanical & Automation Engineering');

-- 3. Insert Dummy Data into User Tables
-- Admin
INSERT INTO Admin (admin_name, admin_email, admin_phone, password)
VALUES 
('Admin One', 'admin1@example.com', '555-1001', 'adminpass1'),
('Admin Two', 'admin2@example.com', '555-1002', 'adminpass2');

-- Office_Admin
INSERT INTO Office_Admin (office_admin_name, office_admin_email, office_admin_phone, office_name, password)
VALUES 
('Office Admin One', 'officeadmin1@example.com', '555-2001', 'Main Office', 'officepass1'),
('Office Admin Two', 'officeadmin2@example.com', '555-2002', 'Main Office', 'officepass2');

-- Dept_Admin
INSERT INTO Dept_Admin (dept_admin_name, dept_admin_email, dept_admin_phone, department_id, password)
VALUES 
('Dept Admin CE', 'deptadmince@example.com', '555-3001', 1, 'deptpass1'),
('Dept Admin IT', 'deptadminit@example.com', '555-3002', 2, 'deptpass2');

-- Faculty
INSERT INTO Faculty (faculty_name, faculty_email, faculty_phone, department_id, password)
VALUES 
('Faculty CE', 'facultyce@example.com', '555-4001', 1, 'facultypass1'),
('Faculty IT', 'facultyit@example.com', '555-4002', 2, 'facultypass2');

-- Student
INSERT INTO Student (student_name, student_email, student_phone, enrollment_year, department_id, program_id, password)
VALUES 
('Student One', 'student1@example.com', '555-5001', 2023, 1, 1, 'studentpass1'),
('Student Two', 'student2@example.com', '555-5002', 2023, 2, 2, 'studentpass2');

-- 4. Populate User_Main Table
-- From Admin
INSERT INTO User_Main (user_name, user_password, user_email, role_id)
SELECT admin_email, password, admin_email, role_id FROM Admin;

-- From Office_Admin
INSERT INTO User_Main (user_name, user_password, user_email, role_id)
SELECT office_admin_email, password, office_admin_email, role_id FROM Office_Admin;

-- From Dept_Admin
INSERT INTO User_Main (user_name, user_password, user_email, role_id)
SELECT dept_admin_email, password, dept_admin_email, role_id FROM Dept_Admin;

-- From Faculty
INSERT INTO User_Main (user_name, user_password, user_email, role_id)
SELECT faculty_email, password, faculty_email, role_id FROM Faculty;

-- From Student
INSERT INTO User_Main (user_name, user_password, user_email, role_id)
SELECT student_email, password, student_email, role_id FROM Student;

-- 5. Create Indexes
CREATE INDEX idx_user_name ON User_Main (user_name);
CREATE INDEX idx_user_email ON User_Main (user_email);
CREATE INDEX idx_admin_name ON Admin (admin_name);
CREATE INDEX idx_admin_email ON Admin (admin_email);
CREATE INDEX idx_office_admin_name ON Office_Admin (office_admin_name);
CREATE INDEX idx_office_admin_email ON Office_Admin (office_admin_email);
CREATE INDEX idx_dept_admin_name ON Dept_Admin (dept_admin_name);
CREATE INDEX idx_dept_admin_email ON Dept_Admin (dept_admin_email);
CREATE INDEX idx_faculty_name ON Faculty (faculty_name);
CREATE INDEX idx_faculty_email ON Faculty (faculty_email);
CREATE INDEX idx_student_name ON Student (student_name);
CREATE INDEX idx_student_email ON Student (student_email);

-- 6. Create Views
CREATE VIEW vw_user_info AS
SELECT u.user_name, u.user_email, r.role_name
FROM User_Main u
JOIN Role_Main r ON u.role_id = r.role_id;

CREATE VIEW vw_admin_info AS
SELECT a.admin_name, a.admin_email, r.role_name
FROM Admin a
JOIN Role_Main r ON a.role_id = r.role_id;

CREATE VIEW vw_office_admin_info AS
SELECT oa.office_admin_name, oa.office_admin_email, r.role_name
FROM Office_Admin oa
JOIN Role_Main r ON oa.role_id = r.role_id;

CREATE VIEW vw_dept_admin_info AS
SELECT da.dept_admin_name, da.dept_admin_email, r.role_name
FROM Dept_Admin da
JOIN Role_Main r ON da.role_id = r.role_id;

CREATE VIEW vw_faculty_info AS
SELECT f.faculty_name, f.faculty_email, r.role_name
FROM Faculty f
JOIN Role_Main r ON f.role_id = r.role_id;

CREATE VIEW vw_student_info AS
SELECT s.student_name, s.student_email, r.role_name
FROM Student s
JOIN Role_Main r ON s.role_id = r.role_id;

-- 7. Create Stored Procedures
DELIMITER //
CREATE PROCEDURE sp_get_user_info(IN user_name VARCHAR(50))
BEGIN
    SELECT * FROM User_Main WHERE user_name = user_name;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_admin_info(IN admin_name VARCHAR(100))
BEGIN
    SELECT * FROM Admin WHERE admin_name = admin_name;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_office_admin_info(IN office_admin_name VARCHAR(100))
BEGIN
    SELECT * FROM Office_Admin WHERE office_admin_name = office_admin_name;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_dept_admin_info(IN dept_admin_name VARCHAR(100))
BEGIN
    SELECT * FROM Dept_Admin WHERE dept_admin_name = dept_admin_name;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_faculty_info(IN faculty_name VARCHAR(100))
BEGIN
    SELECT * FROM Faculty WHERE faculty_name = faculty_name;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_student_info(IN student_name VARCHAR(100))
BEGIN
    SELECT * FROM Student WHERE student_name = student_name;
END//
DELIMITER ;