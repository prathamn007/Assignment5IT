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
        res.redirect(`books/${newBook.id}`)
    }catch{
        renderNewPage(res, book, true);
    }
})

//Showing the book
router.get('/:id', async (req,res) => {
    try{
        const book = await Book.findById(req.params.id).populate('author').exec()
        res.render('books/show', { book: book})
    }catch{
        res.redirect('/')
    }
})

//route for editing the book
router.get('/:id/edit', async (req, res)=>{
    try{
        const book = await Book.findById(req.params.id)
        renderEditPage(res, book)
    }catch{
        res.redirect('/')
    }
})

//update book route
router.put('/:id', async (req, res)=>{
    let book

    try{
        book = await Book.findById(req.params.id)
        book.title = req.body.title
        book.author = req.body.author
        book.publishDate = new Date(req.body.publishDate)
        book.pageCount = req.body.pageCount
        book.description = req.body.description
        if(req.body.cover != null && req.body.cover !== ''){
            saveCover(book, req.body.cover)
        }
        await book.save()
        res.redirect(`/books/${book.id}`)
    }catch{
        if(book != null){
            renderEditPage(res, book, true)
        }else{
            res.redirect('/')
        }
    }
})

//deleting book route
router.delete('/:id', async (req,res) => {
    let book
    try{
        book = await Book.findById(req.params.id)
        await book.remove()
        res.redirect('/books')
    }catch{
        if(book != null){
            res.render('books/show', {
                book: book,
                errorMessage: 'Could not remove book'
            })
        }else{
            res.redirect('/')
        }
    }
})

async function renderNewPage(res, book, hasError = false){
    renderFormPage(res, book, 'new', hasError)
}

async function renderEditPage(res, book, hasError = false){
    renderFormPage(res, book, 'edit', hasError)
}

//page called by new or edit
async function renderFormPage(res, book, form, hasError = false){
    try{
        const authors = await Author.find({}) //wait till all authors are loaded
        const params = {
            authors: authors,
            book: book
        }
        if(hasError){
            if(form === 'edit'){
                params.errorMessage = 'Error updating book'
            }else{
                params.errorMessage = 'Error creating book'
            }
        }
        res.render(`books/${form}`, params)
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