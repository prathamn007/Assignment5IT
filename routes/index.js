const express = require("express")
const router = express.Router() //router function of express
const Book = require('../models/book')

//route for the root
router.get('/', async (req, res)=>{
    //sorting the books in the "Books" page by recently added
    let books
    try{
        books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
    }catch{
        books = []
    }
    res.render('index', { books: books })
})

//exporting the router to be imported in the server
module.exports = router