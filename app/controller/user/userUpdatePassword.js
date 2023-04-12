const db = require("../../models")
const User = db.user
const jwt_decode = require('jwt-decode');
const { validationResult } = require("express-validator")
const { StatusCodes } = require('http-status-codes')
const { encryptPassword } = require("../../util/encryptPassword");

module.exports = async (req, res, next) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      const errors = new Error(error?.errors[0]?.msg)
            errors.StatusCode = StatusCodes.BAD_REQUEST
            errors.Message = error?.errors[0]?.msg
            throw errors(error)
    }
    const { password } = req.body
    const token = req.headers["authorization"]
    const email = jwt_decode(token).email
    const user = await User.findOne({ where: { email } },
      {
        password: encryptPassword(password)
      },
      {
        new: true
      })
    if (user) {
      return res.status(StatusCodes.OK)
        .json({ StatusCode: StatusCodes.OK, Message: "Password updated successfully" });
    }
  } catch (error) {
    return next(error)
  }
};