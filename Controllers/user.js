const User = require("../Models/user")
const {setUser} = require('../Services/auth')
const bcrypt = require('bcrypt')

async function handleUserSignUp(request,response){
  const {firstname,lastname,email,password,address} = request.body

  try{
    const existingUser = await User.findOne({email});
    if(existingUser){
      return response.status(401).send("Email Already Exists")
    }
    
    const salt = await bcrypt.genSalt(10)
    const securedPassword = await bcrypt.hash(password,salt)

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: securedPassword,
      address
    })
    return response.status(201).send('User created')
  }catch(error){
    console.error(error);
    return response.status(500).send("Internal Server Error")
  }
    // // 
    // await User.create({
    //   firstname,lastname,email,password,address
    // })
    // return response.redirect("/login")
}

async function handleUserLogin(request,response){
  const {email,password} = request.body

  try{

    const user = await User.findOne({email})
    
    if(!user)
      return response.status(401).send("Invalid Username or Password")
    
    
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      response.status(401).send("Invalid Username or Password")
    }
    
    const token = setUser(user)
    // return response.json({token})
    response.cookie("uid",token)
     response.status(201).send("User Login Success")
  }catch(eror){
    console.log("Login Error",eror)
     response.status(500).send("Internal Server Error")
  }
}




module.exports = {handleUserSignUp,handleUserLogin}