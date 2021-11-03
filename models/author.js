//using mongodb
const mongoose = require('mongoose')

//creating the author schema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

//export this schema, with table name- Author
module.exports = mongoose.model('Author', authorSchema)