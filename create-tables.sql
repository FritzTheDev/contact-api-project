CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  password_hash TEXT
);
CREATE TABLE groups (
  id serial PRIMARY KEY,
  group_name TEXT,
  owner_id integer REFERENCES users
);
CREATE TABLE contacts (
  id serial PRIMARY KEY,
  email TEXT,
  owner_id integer REFERENCES users,
  group_id integer REFERENCES groups
);