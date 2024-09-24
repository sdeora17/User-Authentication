const express = require('express')
const {connectToMongoDB} = require('./connect');
const path = require("path")

const userRoute = require('./Routers/user')
const staticRoute = require('./Routers/staticrouter')
const mainRoute = require('./Routers/mainroute')

const cookieParser = require('cookie-parser')
const {restrictToLoggedInUsersOnly} = require('./Middlewares/auth')

const app =  express();
const PORT = 8003
app.use(express.json())
app.use(cookieParser())
// Form Data

app.use(express.urlencoded({extended:false}))





connectToMongoDB('mongodb://localhost:27017/Project')
.then(()=>console.log("Mongo DB Connected"))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use("/main",restrictToLoggedInUsersOnly,mainRoute)
app.use("/",staticRoute)
app.use("/user",userRoute)


app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`))