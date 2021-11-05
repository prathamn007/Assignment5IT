const express = require("express")
const router = express.Router() //router function of express
const Author = require('../models/author')

//route for all authors
router.get('/', async (req, res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){ //query is used since get request sends query while post sends body
        searchOptions.name = new RegExp(req.query.name, 'i') //regular expression case insensitive to search for the string
    } 
    try{
        const authors = await Author.find(searchOptions) //to find the author from the index
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query //send the query back to user to repopulate the box
        })
    }catch{
        res.redirect('/') //redirect to main page if error 
    }
})

//route for new author
router.get('/new', (req, res)=>{
    res.render('authors/new', { author: new Author() })
})

//using post to create author route
router.post('/', async (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch{
        let locals = {errorMessage: "Error Creating Author"}
        res.render('authors/new', {
            author: author,
            locals: locals
        })
    }
})

//exporting the router to be imported in the server
module.exports = router