const express = require("express")
const author = require("../models/author")
const router = express.Router() //router function of express
const Author = require('../models/author')

//route for all authors
router.get('/', (req, res)=>{
    res.render('authors/index')
})

//route for new author
router.get('/new', (req, res)=>{
    res.render('authors/new', { author: new Author() })
})

//using post to create author route
router.post('/', (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    author.save((err, newAuthor) => {
        if(err){
            let locals = {errorMessage: "Error Creating Author"}
            res.render('authors/new', {
                author: author,
                locals: locals
            })
        }else{
            //res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
        }
    })
})

//exporting the router to be imported in the server
module.exports = router