//using mongodb
const mongoose = require('mongoose')
const Book = require('./book')

//creating the author schema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

//code to prevent the deletion of author alone which leaves book without an author
authorSchema.pre('remove', function(next){
    Book.find({ author: this.id }, (err, books) => {
        if(err){
            next(err)
        }else if (books.length > 0){
            next(new Error('This author still has books'))
        }else{
            next()
        }
    })
})

//export this schema, with table name- Author
module.exports = mongoose.model('Author', authorSchema)