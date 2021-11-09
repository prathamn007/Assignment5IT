# Library Manager Web-App
## Initial Project Setup
- Download and install [NodeJS](https://nodejs.org/en/)
- Now pull this project to your local machine by following this [video](https://www.youtube.com/watch?v=_ynMa2XlRgk)
- Run the below command to install express server and ejs templating engine
```
npm i express ejs express-ejs-layouts
```
- Install the development dependencies and nodemon which will help us automatically refresh and restart server whenever a change is made
```
npm i --save-dev nodemon
```
- Install mongoDB on your system from [here](https://www.mongodb.com/try/download/community)
- Then run the below command to install the library for MongoDB called Mongoose which enables easy integration
```
npm i mongoose
```
- Install dotenv locally to load environment variables.
```
npm i --save-dev dotenv
```
- When editing on your local machine, create a .env file which contains the environment variables. This file includes the link to local MongoDB database in your system while editing locally.
```
DATABASE_URL=mongodb://localhost/library
```
- Now initialise the local files with a remote github repository.
- Sign up on [Heroku](https://www.heroku.com/) and create a new app. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) on your machine. Push the github repo to Heroku using the below command. 
```
git push heroku 'branch name'
```
- Once done, sign up/log in to the [MongoDB Atlas](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwj419D03or0AhWaCysKHW4qCoMYABABGgJzZg&ae=2&ohost=www.google.com&cid=CAESQOD20gNkANFo1tvfEs0Uy-c4QSFN2lOkc1jSvS7n6VxMOcyB--dMtyml9VVwKM1GLmv09D2DUEIkQUa9WAK1KQY&sig=AOD64_2RXazC1BkFCGjvMuV2UAAODZzgzA&q&adurl&ved=2ahUKEwj6x8n03or0AhXExjgGHbQEDroQ0Qx6BAgCEAE) account, create a free cluster, add a database user, copy the link to the database by following the instructions on the page and paste the same in the *Reveal Config* section under *Settings* tab on your Heroku dashboard. This will link the DATABASE_URL variable to the online database.

![Screenshot 2021-11-09 125926](https://user-images.githubusercontent.com/58143437/140881106-434c70b2-5ba2-462c-bd67-73a1496864bc.png)

## File Structure
This project follows the [MVC Architecture](https://towardsdatascience.com/everything-you-need-to-know-about-mvc-architecture-3c827930b4c1) for setting up the file structure. The controller is the *routes* folder in this setup. *Ejs* is used as the templating engine for this project.

## Other Requirements
- Since the browsers do not usually support PUT and DELETE methods for forms (see [here](http://www.packetizer.com/ws/rest.html)), we will be using ***method override*** to implement them. 
```
npm i method-override
```
- The file uploading, which in our app is the Book cover uploading, will be taken care of by [FilePond](https://pqina.nl/filepond/). It presents us with a good-looking UI and file preview and also eases out the file uploading process, since we need not make use of ***multi-part forms*** for the same.
- [***async/await***](https://javascript.info/async-await) functions are also used to provide an easier error handling, which will be done using the [***try/catch***](https://www.w3schools.com/java/java_try_catch.asp) method. 
