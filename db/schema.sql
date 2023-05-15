DROP DATABASE IF EXISTS 'employees';
CREATE DATABASE 'employees';
USE 'employees';

CREATE TABLE 'employee' (
  'id' INT PRIMARY KEY AUTO_INCREMENT,
  'first_name' VARCHAR(30) NOT NULL,
  'last_name' VARCHAR(30) NOT NULL,
  'role_id' INT NOT NULL,
  'manager_id' INT NOT NULL,
  PRIMARY KEY ('id')
) 

CREATE TABLE 'department' (
  'id' INT PRIMARY KEY AUTO_INCREMENT,
  'name' VARCHAR(30) NOT NULL,
  PRIMARY KEY ('id')
)

CREATE TABLE 'role' (
'id' INT PRIMARY KEY AUTO_INCREMENT,
'title' VARCHAR(30) NOT NULL,
'salary' DECIMAL(10,2) NOT NULL,
'department_id' INT NOT NULL,
  PRIMARY KEY ('id')
)