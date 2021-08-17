# EtherFrolics
 
_Project Duration: 2 Week Sprint_
 
EtherFrolics is a professional application that allows medical providers to browse medical missions around the world where anesthesia will be needed to be administered on a patient. It serves as a platform that allows providers to upload medical credentials so that they can be alerted when their credentials are close to expiring. There is also an administrator view that can verify a provider's personal and credential information and approve them to begin browsing and applying to missions that are posted by the administrator. While credentials and mission information exists on a variety of platforms, EtherFrolics is a single application that more efficiently allows a provider to track their medical credentials and connect with missions around the world.
 
<!-- Live Version deployed on Heroku at: [EtherFrolics](https://ether-frolics-1.herokuapp.com/#/home/0) -->
 
## Screen Shot
 
![Home Page](/public/images/homepage.jpeg)
![View Providers](/public/images/providers.jpeg)
![Admin Solo Provider View](/public/images/adminproviders.jpeg)
![Mission Page](/public/images/missions.jpeg)
 
### Prerequisites
Before getting started launching this application, you should have the following software installed on your computer: 
 
- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io) 
- [PostgreSQL](https://www.postgresql.org)
 
## Database Setup
Create a new database called `ether-frolics` in PostgreSQL and use the `database.sql` file in the root of the project to create your tables.
 
## Creating the .ENV file
Create a .env file in the root of the project. This file will require several pieces of information that will need to each be acquired separately. Further instruction on obtaining these keys are provided below: 
`SERVER_SESSION_SECRET = **********
AWS_BUCKET_NAME = **************
AWS_BUCKET_REGION = ************
AWS_ACCESS_KEY = ***********
AWS_SECRET_KEY = ************`
 
First, you will need to establish the `SERVER_SESSION_SECRET` key. This will need to be longer than 8 characters or you will get a warning from the app. This website, (https://passwordsgenerator.net), can create a random password for you to use.
 
### AWS s3 Bucket Setup
This application utilizes the AWS SDK for node, and some functions declared in the ‘s3.js’ file, to upload / download images to an s3 bucket. Specific permissions that are required for this functionality are as follows, and need to be assigned to a user with ‘programmatic access’. The keys of that user are the AWS_ACCESS_KEY & AWS_SECRET_KEY mentioned above. The following permissions are set at a policy level in AWS, and assigned to the application via the keys. Permissions needed:
getObject (Read)
putObject (Write)
deleteObject (Write)
 
 
## Installation
1. Make sure that you have created your database and tables using the `database.sql` file. Please refer to the Database Setup section above if you have not already done so.
2. Using a code editor of your choice, run an `npm.install` command in the terminal.
3. Next, use the command `npm run server` in your terminal to start the server. NOTE: Start the server before starting the browser.
4. After starting the server, use the command `npm run client` in your terminal to automatically open a new browser that will run the application.
5. If a new browser does not automatically open, start a new tab and type in `localhost3000` to use the application.
 
## How to use EtherFrolics
* A new user will be greeted at a homepage where they will have the option to either login (returning users) or register an account that is located at the bottom of the page.
* A user will need to create a username and a password in order to use the application.
* Both the login and registration process will be the same for administrators and providers.
### The Provider
* Upon logging in, a provider will be prompted to register within their profile before they can begin using the app.
* There is a button that they can click on where they will need to fill out the following information:
  * A General Info page with basic information including Name, DOB, Provider Role, etc.
  * A Contact Info page that includes a Phone Number, Address, etc.
  * A Work History page that can receive multiple work histories. There is also a button that allows for a resume pdf upload. NOTE: A user will need to click the `Attach` button below the resume upload to attach the resume and the `Add Work History Entry` button at the bottom of the page to submit the entry. This is the same process that will need to be followed for the following pages after the Work History page.
  * A Mission History page that can also receive multiple entries. There are also buttons that allow for an image upload.
  * An Education page that can receive multiple entries. There are buttons that allow for an image upload.
  * A Medical Credentials page that can receive multiple entries. There are buttons that allow for an image upload.
  * An Insurance page that can receive multiple entries. There are buttons that allow for an image upload.
* Upon registration, a provider will be directed to a landing page where they can view and edit information about themselves in addition to view credentials. A red exclamation icon will show when a credential is within 3 months of expiring.
* Upon review and approval from the administrator, a provider will be able to view the missions that have been posted and be able to apply to them by following the link in the table.
### The Administrator
* Upon logging in, the administrator will be taken to their landing page where there will be three buttons:
  * The `PROVIDER MANAGEMENT` button will allow the admin to view registered providers. The admin can view each provider by clicking on their name or by typing their name into the search bar. A star icon will be next to provider names who the admin has approved to view missions.
  * The `MISSION MANAGEMENT` button will allow the admin to view missions that they have posted in addition to editing those missions by swiping left on the table.
  * The `CREATE MISSION` button will allow the admin to create a new mission that will be added to the mission table. 

## Built With
- React
- Redux
- Material UI
- AWS S3
- Node.js
- Express.js
- PostgreSQL
 
## Acknowledgement
- We would like to thank our client, Justin, who envisioned this application and for trusting our team to turn his idea into a reality.
- We would also like to thank [Prime Digital Academy](www.primeacademy.io) for giving us the opportunity to take on this project.
- We would like to give a very special thanks to our instructor, Dane Smith, who has prepared us not only for this project, but also to take on a new career in software development. 
 
## Support
If you have questions, concerns, or suggestions, please email one of our 5 developers who worked on this project:  
[Ben Hall](https://github.com/benjamhall) - [benjamhall@gmail.com](mailto:benjamhall@gmail.com)  

[Emry Brisky](https://github.com/eabrisky) - [eabrisky@gmail.com](mailto:eabrisky@gmail.com)  

[Jacob Motes](https://github.com/jcm2583) - [jmotes2583@gmail.com](mailto:jmotes2583@gmail.com)  

[Preston Thomas](https://github.com/eabrisky) - [preston.thomas355@gmail.com](mailto:preston.thomas355@gmail.com)  

[Tucker Landis](https://github.com/TuckerLandis) - [landistuckerc@gmail.com](mailto:landistuckerc@gmail.com) 
