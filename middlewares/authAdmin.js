const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports.loggedMiddleware = async (req, res, next) => {
  try {
    const user = await User.findOne({_id:req.auth.userId})
    if (user.role === "admin"){
    next()
}
else{
    res.status(403).json({error:"no access to admin route"})
}
  } catch (error) {
    res.status(401).json({ error })
  }
}