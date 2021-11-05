const express = require("express")
const router = express.Router() //router function of express
const multer = require('multer')
const path = require('path')
const fs = require('fs') //module required for deleting book cover when error is shown
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'] //image types accepted
const upload = multer({ //uploading the cover image
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

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
router.post('/', upload.single('cover'), async (req, res)=>{
    const fileName = req.file != null ? req.file.filename : null //getting the filename if it exists, can send error if file isnt uploaded
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    })
    //saving the book code
    try{
        const newBook = await book.save()
        // res.redirect(`books/$(newBook.id)`)
        res.redirect(`books`)
    }catch{
        if(book.coverImageName != null){
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book, true);
    }
})

function removeBookCover(fileName){
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}

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

//exporting the router to be imported in the server
module.exports = router