CREATE DATABASE role_auth;
USE role_auth;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(50),
  role ENUM('admin', 'user')
);

INSERT INTO users (username, password, role) VALUES
('admin1', 'admin123', 'admin'),
('user1', 'user123', 'user');