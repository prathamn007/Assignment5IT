const express = require("express")
const router = express.Router() //router function of express

//route for the root
router.get('/', (req, res)=>{
    res.render('index')
})

//exporting the router to be imported in the server
module.exports = router