const express = require("express")
const router = express.Router() //router function of express
const Book = require('../models/book')
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'] //image types accepted

//route for all books
router.get('/', async (req, res)=>{
    //adding filter for title searching, date searching etc.
    let query = Book.find()
    if(req.query.title != null && req.query.title != ''){
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != ''){
        //using less than or equal to
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != ''){
        //using greater than or equal to
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    try{
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
})

//route for new book
router.get('/new', async (req, res)=>{
    renderNewPage(res, new Book())
})

//using post to create book route
router.post('/', async (req, res)=>{
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
    //saving the book cover
    saveCover(book, req.body.cover)

    //saving the book code
    try{
        const newBook = await book.save()
        // res.redirect(`books/$(newBook.id)`)
        res.redirect(`books`)
    }catch{
        renderNewPage(res, book, true);
    }
})

async function renderNewPage(res, book, hasError = false){
    try{
        const authors = await Author.find({}) //wait till all authors are loaded
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = 'Error creating book'
        res.render('books/new', params)
    }catch{
        res.redirect('/books')
    }
}

function saveCover(book, coverEncoded){
    //checking if cover is valied and then including in the book
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)){
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}

//exporting the router to be imported in the server
module.exports = router