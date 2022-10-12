<h2>About</h2>

This is the server side of the employee database. It utilises an express sver using node to create the Model and Controller parts of the MVC model for this app.
Using an SQL db with postgres, there are 2 different databases that run with the server, one controlling all the employees, and one controlling the accounts that contains the hashed and salted password.

<h2>Built with: </h2>

Express.js
Node.js
Postgres
Bcrypt
Nodemon

<h2>How to use<h2>

<ol>
  <li>'npm install' to install all dependencies</li>
  <li>You will need to install postgres on your machine to create and link a database in the db.js folder</li>
  <li>'npm run dbsetup' to set up and seed the database (can edit it so one initial super user exists)</li>
  <li>'npm run dev' for the app to run on whatever port you chose, here it is on port 5005</li>
</ol>
