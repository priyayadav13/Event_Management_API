const db = require("../../models")
const User = db.user
const { signToken } = require("../../util/signToken")
const jwt_decode = require('jwt-decode');
const { encryptPassword } = require("../../util/encryptPassword")
const { StatusCodes } = require('http-status-codes')
const { validationResult } = require("express-validator")

exports.requestToResetPassword = async (req, res, next) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      const errors = new Error(error?.errors[0]?.msg)
            errors.StatusCode = StatusCodes.BAD_REQUEST
            errors.Message = error?.errors[0]?.msg
            throw errors(error);
    }

    const { email } = req.body;
    const user = await User.findOne({ where: {  email } })
    if (!user) {
      throw res.status(StatusCodes.BAD_REQUEST)
        .json({ StatusCode: StatusCodes.BAD_REQUEST, Message: "User Does't Exist" })
    }
    if (user) {
      const token = await signToken(email)
      return res.status(StatusCodes.CONTINUE)
        .json({ StatusCode: StatusCodes.CONTINUE, Message: "Request send successfully", "Token": token })
    }
  } catch (error) {
    return next(error)
  }
}


exports.resetPassword = async (req, res, next) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      const errors = new Error(error?.errors[0]?.msg)
            errors.StatusCode = StatusCodes.BAD_REQUEST
            errors.Message = error?.errors[0]?.msg
            throw errors()
    }
    const { password, token } = req.body
    const email = jwt_decode(token).email

    const result = await User.findOne(
      {
        where:
        {
          email: email
        }
      },
      {
        password: encryptPassword(password)
      })
    if (result) {
      return res.status(StatusCodes.OK)
      .json({ StatusCode: StatusCodes.OK, Message: "Password reset successfully", "Updated Password": password })
    }
  } catch (error) {
    return next(error)
  }
}