const db = require("../../models/index");
const User = db.user;
const signToken = require("../../util/signToken")
const { validationResult } = require("express-validator")
const { comparePasswords, encryptPassword } = require("../../util/encryptPassword")
const { StatusCodes } = require('http-status-codes')

//login
module.exports = async (req, res, next) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      const errors = new Error(error?.errors[0]?.msg)
            errors.StatusCode = StatusCodes.BAD_REQUEST
            errors.Message = error?.errors[0]?.msg
            throw errors(error);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw res.status(StatusCodes.BAD_REQUEST)
        .json({ StatusCode: StatusCodes.BAD_REQUEST, Message: `User with ${email} Does't Exist.` })
    }

    const registeredUser = await user && (await comparePasswords(password, user.password))
    console.log(await user.password)
    console.log(await encryptPassword(password))
    console.log(registeredUser)

    if (!registeredUser) {
      throw res.status(StatusCodes.BAD_REQUEST)
        .json({ StatusCode: StatusCodes.BAD_REQUEST, Message: `User with ${email} Does't match Password.` })
    }
    else {
      const token = await signToken(email)
      return res.status(StatusCodes.ACCEPTED)
        .json({ "Registered User": user, "Token": token });
    }

  } catch (error) {
    return next(error);
  }
}

