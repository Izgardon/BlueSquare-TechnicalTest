DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(250) NOT NULL,
    lastName VARCHAR(250) NOT NULL,
    jobRole VARCHAR(250) NOT NULL,
    department VARCHAR(250) NOT NULL,
    email VARCHAR(100)NOT NULL UNIQUE,
    number VARCHAR(100)NOT NULL UNIQUE,
    isAdmin BOOLEAN NOT NULL,
    
);

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    email varchar(100) NOT NULL UNIQUE,
    password varchar(255) UNIQUE,
);

INSERT INTO users (id, firstName, lastName, jobRole, department, email, number, isAdmin) 
VALUES
    (1, 'Will', 'Sessions', 'Coder', 'Tech','will@bluesquare.com','0781927812', TRUE )