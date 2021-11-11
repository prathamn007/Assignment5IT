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


## Screenshots
### Main Page
Contains upto six recently added books. This is the **index** route of the web application. 
```
https://library-manager-01.herokuapp.com/
```

![image](https://user-images.githubusercontent.com/58143437/141256242-9a437985-c2e8-4516-a69c-ebc2a57e7221.png)

### Show Authors
Shows all the authors in a single list view from where you can edit, delete or view the author. Deleting the author is not allowed until he/she has books attached to his/her name. This is the **/authors** route. 
```
https://library-manager-01.herokuapp.com/authors
```

![image](https://user-images.githubusercontent.com/58143437/141256331-64e6a5d9-785f-4bd1-852b-dbe03bea94f7.png)

### View Author
Displays the author along with his/her books. All book images are links. This is the route for the **individual authors** where the **author_id** is shown in the url.
```
https://library-manager-01.herokuapp.com/authors/618cb9b6d90d4af2ac39dcc2
```

![image](https://user-images.githubusercontent.com/58143437/141256524-906b3043-667c-4d29-aa99-bb2bc8eb8304.png)

### Add Author
A simple textbox to input the author's name and create an  author. This is the **/authors/new** route
```
https://library-manager-01.herokuapp.com/authors/new
```

![image](https://user-images.githubusercontent.com/58143437/141256829-58d8dc72-4fa0-4078-8edc-7854547c7f70.png)

### Edit Author
This page is used to edit the author name. **author_id** is used in this process.

```
https://library-manager-01.herokuapp.com/authors/618cb9b6d90d4af2ac39dcc2/edit
```

![image](https://user-images.githubusercontent.com/58143437/141259135-cbcacd34-7745-4b2a-b4c6-fdade247603f.png)


### Books
This page displays the book covers as links to individual books. The book searching is also implemented in this page. Books can be searched on the basis of title, published before and after parameters. This is the **/books** route.

```
https://library-manager-01.herokuapp.com/books
```

![image](https://user-images.githubusercontent.com/58143437/141258078-58089bdf-185e-41f2-a328-e044b0eacf7a.png)

### View Book
This is similar to view author page. CSS grid layout is used to organise the content on the page. Again **book_id** is visible in the url. We can edit, view author or delete the book from this page.

```
https://library-manager-01.herokuapp.com/books/618cbabed90d4af2ac39dcd0
```

![image](https://user-images.githubusercontent.com/58143437/141258372-cf4c602e-2ada-4a33-9f21-1ac68e743fd8.png)

### New Book
Again similar to create author page, the basic route structure remains the same (**/books/new**). But the form fields are different. As mentioned beforehand, **Filepond** and its corresponding style classes and attributes are used to style the file upload section.

```
https://library-manager-01.herokuapp.com/books/new
```

![image](https://user-images.githubusercontent.com/58143437/141258804-9f3bb05a-bb6e-44a8-93cb-4c246b720369.png)

### Edit Book
Similar to edit author, the edit book page is a repurposed new book page which pre-populates the fields of the book using the **book_id**. One can change any detail of the book as required.

```
https://library-manager-01.herokuapp.com/books/618cbabed90d4af2ac39dcd0/edit
```

![image](https://user-images.githubusercontent.com/58143437/141259361-e7597037-91cd-4eb4-9fa5-7c6965d17f3d.png)
