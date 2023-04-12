const db = require("../../models")
const User = db.user
const jwt_decode = require('jwt-decode')
const {StatusCodes} = require('http-status-codes')

module.exports=  async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
    const decode = jwt_decode(token)
    const email = decode.email
    const userData = await User.findOne({where: {email: email}})
    if(userData){
      return res.status(StatusCodes.OK).json({StatusCode:"StatusCodes.OK",Message:"Successfully Logout"})
    }
    else{
      throw res.status(StatusCodes.PROCESSING).json({StatusCode:"StatusCodes.PROCESSING",Message:"Unknown User"});
    }
  } catch (error) {
    return next(error)
  }
}