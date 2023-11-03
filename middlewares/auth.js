const jwt = require("jsonwebtoken")

module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
    const userId = decodedToken.userId
    //method 2 of findOne
    // User.findOne({id:userId}).then((response)=>{
    //     if(response){
    //         req.auth = {
    //             userId: userId,
    //             role: response.role
    //         }
    //         next()
    //     }else{
    //         res.status(401).json({error: "user doesn't exist"})
    //     }
    // })
    // .catch((error) =>{
    //     res.status(500).json({error: error.message})

    // })
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}

