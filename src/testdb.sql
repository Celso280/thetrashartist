DROP TABLE users;
CREATE TYPE user_role as ENUM ('admin','user');
CREATE TYPE art_status as ENUM ('pass','pending','rejected');

DROP TABLE IF EXISTS users
CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL,
    contact VARCHAR(11) NOT NULL,
    role user_role NOT NULL,
    date_inserted TIMESTAMP,
    date_updated TIMESTAMP
);

DROP TABLE IF EXISTS art_upload
CREATE TABLE art_upload(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    art_photo VARCHAR(30) NOT NULL,
    art_price NUMERIC NOT NULL,
    location VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date_inserted TIMESTAMP,
    date_updated TIMESTAMP
);

DROP TABLE IF EXISTS artist_profile
CREATE TABLE artist_profile(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    art_sold INTEGER NOT NULL,
    background VARCHAR(100) NOT NULL,
    date_inserted TIMESTAMP,
    date_updated TIMESTAMP
);

DROP TABLE IF EXISTS art_registration
CREATE TABLE art_registration(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    status art_status NOT NULL,
    date_inserted TIMESTAMP,
    date_updated TIMESTAMP
);
