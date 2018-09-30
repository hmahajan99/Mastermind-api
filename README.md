# Mastermind API

> This repository hosts the code for the backend part. Code for the frontend built using React can be found at https://github.com/hmahajan99/Mastermind.

> Refer to https://github.com/hmahajan99/Mastermind for more details about this project.

> Frontend deployed at https://mastermind-hm.herokuapp.com/ 

## Schema
The schema for database used is
```
CREATE TABLE users(
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL	
);

CREATE TABLE login(
	id serial PRIMARY KEY,
	hash VARCHAR(100) NOT NULL,
	email text UNIQUE NOT NULL
);

Note: email acts as a foreign key from relation login referencing users.
```
