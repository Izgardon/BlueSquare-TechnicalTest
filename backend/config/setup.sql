DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    firstName VARCHAR(250) NOT NULL,
    lastName VARCHAR(250) NOT NULL,
    jobRole VARCHAR(250) NOT NULL,
    department VARCHAR(250) NOT NULL,
    email VARCHAR(100)NOT NULL UNIQUE,
    number VARCHAR(100)NOT NULL UNIQUE,
    
);

INSERT INTO users (id, firstName, lastName, jobRole, department, email, number) 
VALUES
    (1, 'Will', 'Sessions', 'Coder', 'Tech','will@bluesquare.com','0781927812' )