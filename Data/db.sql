CREATE DATABASE taskList;
USE taskList;

CREATE TABLE users(
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE task(
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    idUser INT(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    CONSTRAINT fk_userid FOREIGN KEY(idUser) REFERENCES users(id)
);

INSERT INTO users(firstname, lastname, email) VALUES('Vicente','Valenzuela','hola@mundo.com'),('Tony','Stark','iron@man.com');
INSERT INTO task(idUser, title) VALUES (1,'Run in the morning'),(2,'Study in the university');
INSERT INTO task(idUser, title) VALUES (1,'Do homework'),(2,'Beat godzilla');