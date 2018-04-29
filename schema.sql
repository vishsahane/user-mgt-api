CREATE TABLE Users(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    contact_number varchar(255),
    dob date,
PRIMARY KEY (id)
);


INSERT INTO Users( first_name, last_name, email, contact_number, dob)
VALUES ('Vishwas', 'Sahane', 'sahanevishwas@yahoo.com', '8055535598', '1989-10-05');


INSERT INTO Users( first_name, last_name, email, contact_number, dob)
VALUES ('Mahesh', 'Pallod', 'pallodmahesh@yahoo.com', '9845362732', '1992-10-23');