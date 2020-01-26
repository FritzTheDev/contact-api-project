# Frederick "Fritz" Johnson's Interview Project

### General Notes & Thoughts
- Estimated Time Spent Writing This API ~= 7 Hours over the course of a day and a half. That does not include the 2-3 Hours I spent learning SQL before I started.
- This was a fun one, honestly. Raw SQL Queries weren't nearly as painful to work with as I expected. I imagine it's a lot less pleasant when you're writing migrations etc, but still.
- I used a more object-oriented approach than I'm used to when express is concerned, and it treated me alright, but I get the impression that a # of my classes ended up just being bundles of functions that could have been exported seperately. Not sure what to make of that, but if I did it again I'd axe the classes I'm using for services but keep classes for controllers, since they actually have meaningful interaction with their own properties.
- To expand on the point above, if I were to do testing, it (mocking services, in particular) would almost certainly be easier if I went harder on the functions & eased off classes.

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
  - Contacts in the response contain an "email" property, but can also contain a "full_name" property if the email is associated with a user.
  - 403's on other people's groups.

#### Contact Routes
- /contact/ POST (Authed)
  - Adds a contact to the db, given a `group_id` integer and an `email` string
  - Returns the created contact