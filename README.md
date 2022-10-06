# BlueSquare-TechnicalTest
This is the Blue Square Technical Test. Please ensure that you read the entire document before getting started. Feel free to ask any questions if you are unsure on anything below.

## Scenario
Over the past couple of years, the company has grown significantly, hiring a large number of enployees. This has led to many issues where new hires do not know who their colleagues are within the business, what they do or how to contact them.
Therefore, you have been tasked with creating a web application for users to log in to and search for other employees within the businees, which should include information about them, such as their name, job title, department and contact information.

## Requirements
- The system will require a front end website with a backend server for authentication and authorization which will connect to a DB of your choice
- You are free to create this in any framework/language you wish
- The website should only be accessible by employees of the business
- Take into account usability/accessibility considerationsand how this will affect users who visit the site
- Only admins should be able to add new users to the website.
- Admins can view, create, edit and delete users
- Users can view other users, but can only edit their own details
- Be able to view all users, or filter down based on information they know of the employee (eg. name, job role etc)
- Validation on the creation/editing of users to ensure contact information such as mobile numbers and email are valid

## Example database schema – Table = Users
Here is an example of what your database may look like. Please note this is not final and may be missing some information. Feel free to modify this as you deem fit.

Field name       | Type
---------------- | ----------------
id               | Int (PK)
first_name       | Varchar
last_name        | Varchar
job_role         | Varchar
department       | Varchar
avatar           | ?
mobile           | Varchar
email            | Varchar

## Expectations
Fork the repo and commit/push any code to your repository before the deadline. Please do not merge back into the repo
- You do not need to create any databases or deploy this code
- Ensure the solution is well documentated
- Make sure that you commit regularly to git
- You may find that the requirements or information given is incomplete, feel free to alter or expand on them as you see fit and mention these assumptions in a committed text file
- You are not required to fully complete this task, but be prepared to explain what happened and how you attempted to solve it
- Feel free to contact me if you have any questions

GOOD LUCK!