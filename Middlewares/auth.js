const {getUser} = require('../Services/auth.js')

async function restrictToLoggedInUsersOnly(request, response, next) {
  const UserUid = request.cookies?.uid;

  if (!UserUid) {
    return response.redirect('/login');
  }

  const user = getUser(UserUid); 
  if (!user) {
    return response.redirect('/login');
  }

  request.user = user; 
  console.log("Running next function")
  next();
}



module.exports = {
  restrictToLoggedInUsersOnly,
  
}