/*unless we are in development environment, we dont want variables
in .env to load*/
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
} 

const express = require("express") //express app
const app = express()
const expressLayouts = require("express-ejs-layouts") //ejs layout

//link to the router file
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') //set the view engine
app.set('views', __dirname + '/views') //views directory
app.set('layout', 'layouts/layout') //layouts file so that all html files need not be modified
app.use(expressLayouts)
app.use(express.static("public")) //includes public files such as html, css and js

//connecting mongoose
const mongoose = require('mongoose')
//database connection is not hardcoded, so that both local and web connections to databases
//are possible whenever needed
mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true }) 
//check whether we are connected or not
const db = mongoose.connection
//upon error
db.on('error', error => console.error(error))
//upon connection
db.once('open', ()=>console.log('Connected to Mongoose')) 

//use the router file
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000) //listening to a port