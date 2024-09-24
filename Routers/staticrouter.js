const express = require("express")
// const URL = require()

const router = express.Router()

router.get('/signup',(request,response)=>{
  return response.render("signup")
})

router.get('/login',(request,response)=>{
  return response.render("login")
})


module.exports = router