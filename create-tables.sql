CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  password_hash TEXT
);
CREATE TABLE groups (
  id serial PRIMARY KEY,
  group_name TEXT,
  user_id integer REFERENCES users
);
CREATE TABLE emails (
  id serial PRIMARY KEY,
  email TEXT,
  group_id integer REFERENCES groups
);