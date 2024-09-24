const express = require("express")

const router = express.Router()

router.get('/',(request,response)=>{
  return response.render("welcome")
})


module.exports = router