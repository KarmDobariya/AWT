CREATE DATABASE event_tracker;
USE event_tracker;

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50),
    message VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);