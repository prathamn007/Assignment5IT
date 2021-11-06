const express = require("express")
const router = express.Router() //router function of express
const Author = require('../models/author')
const Book = require('../models/book')

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
        res.redirect(`authors/${newAuthor.id}`)
    }catch{
        let locals = {errorMessage: "Error Creating Author"}
        res.render('authors/new', {
            author: author,
            locals: locals
        })
    }
})

//showing the author
router.get('/:id', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(6).exec()
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    }catch{
        res.redirect('/')
    }
})

//route for the edit page
router.get('/:id/edit', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    }catch{
        res.redirect('/authors')
    }
})

//using put request to update
router.put('/:id', async (req, res) => {
    let author
    try{
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    }catch{
        if(author == null){
            res.redirect('/')
        }else{
            let locals = {errorMessage: "Error updating Author"}
            res.render('authors/edit', {
                author: author,
                locals: locals
            })
        } 
    }
})

//delete author
router.delete('/:id', async (req, res) => {
    let author
    try{
        author = await Author.findById(req.params.id)
        await author.remove()
        res.redirect('/authors')
    }catch{
        if(author == null){
            res.redirect('/')
        }else{
            res.redirect(`/authors/${author.id}`)
        } 
    }
})

//exporting the router to be imported in the server
module.exports = router