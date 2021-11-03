const express = require("express") //express app
const app = express()
const expressLayouts = require("express-ejs-layouts") //ejs layout

app.set('view engine', 'ejs') //set the view engine
app.set('views', __dirname + '/views') //views directory
app.set('layout', 'layouts/layout') //layouts file so that all html files need not be modified
app.use(expressLayouts)
app.use(express.static("public")) //includes public files such as html, css and js

app.listen(process.env.PORT || 3000) //listening to a port