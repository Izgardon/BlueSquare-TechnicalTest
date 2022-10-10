DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    jobrole VARCHAR(250) NOT NULL,
    department VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    number VARCHAR(100) NOT NULL UNIQUE,
    isadmin BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    email varchar(100) NOT NULL UNIQUE,
    password varchar(255) UNIQUE
);

INSERT INTO users (firstname, lastname, jobrole, department, email, number, isadmin) 
VALUES
    ('Will', 'Sessions', 'Coder', 'Tech','will@bluesquare.com','0781927812', TRUE ),
    ('Tom', 'Michael', 'HR', 'HR','tom@bluesquare.com','07819278122', TRUE),
    ('Jon', 'Johnson', 'Designer', 'Tech','jon@bluesquare.com','07819232122', FALSE),
    ('Steve', 'Adams', 'Coder', 'Tech','steve@bluesquare.com','0781972312', FALSE); 