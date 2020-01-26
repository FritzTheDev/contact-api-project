# Frederick "Fritz" Johnson's Interview Project

### Steps to get up & running
- Ensure you have postgres (This app tested with PostgreSQL 12) installed locally, with a server running on localhost port 5432
  - Easy way to do this on mac is postgresapp.com's app that handles the tricky parts.
- run `createdb -p 5432 -U <YOUR USERNAME> -h localhost clickup_interview` in your terminal to create the clickup_interview db
- run `psql -p 5432 -U <YOUR USERNAME> -h localhost -f create-tables.sql` to create the tables that'll house your rows of data.
- update the .env file; The only thing you *should* need to change is the PGUSER variable that the node-postgres driver uses to configure the postgres user
- to start the development version, run `npm run dev`
- to build the production version from source, then run it, run `npm run build`, then `npm run start`

### Non-Exhaustive list of things a production app would need to include that are not included in this version
- Reset Password Functionality
- A testing suite, at least for endpoints: I was considering setting one up with Jest & Supertest, but I leaned towards getting the project done faster.
- The environment variables, particularly the JWT secret & postgres auth config, would need to be secured better than "Sent in a .env as part of a zip file"
- Email Verification: the app should ensure that the email address used in registration is an actual valid email that the user has access to.
- Logging tools ala morgan & winston to keep tabs on application logs for things like http requests & errors
- Better validation on data in general; The spec suggested I could go easy on that but an empty string does not make a good password.
- A process manager like strongloop. I'm no expert on this but I know it's important.


### API Documentation

#### Auth Routes
- /auth/register POST (No Auth)
  - Registers a new user, given a `full_name` string, an `email` string, and a `password` string.
  - Hashes the password, checks the email for uniqueness & structure, then saves the user to the db.
  - Returns the user (without the password hash) & a json web token containing the user's id.

- /auth/login POST (No Auth)
  - Logs in a new user, given a valid `email` string & `password` string.
  - Returns the user & a json web token containing the user's id.

#### Group Routes
- /group/ POST (Authed)
  - Creates a new group, given a `group_name` string.
  - The group is associated with the user that created it.

- /group/ GET (Authed)
  - Returns all groups created by the requesting user.
  - Only includes the group rows themeselves, the contacts within are accessed via group detail routes
  
- /group/<id:integer>/ GET (Authed)
  - Returns group details as well as the contacts associated with the group.
  - 403's on other people's groups.

#### Contact Routes
- /contact/ POST (Authed)
  - Adds a contact to the db, given a `group_id` integer and an `email` string
  - Returns the created contact