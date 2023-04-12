const db = require("../../models/index");
const { StatusCodes } = require('http-status-codes')
const User = db.user;
const { validationResult } = require("express-validator")
const { encryptPassword } = require("../../util/encryptPassword")

// Registration
module.exports = async (req, res, next) => {
  try {
    const error = validationResult(req)
    const userData = await User.findOne({ where: { email: req.body.email } })

    if (!error.isEmpty()) {
      const errors = new Error(error?.errors[0]?.msg)
            errors.StatusCode = StatusCodes.BAD_REQUEST
            errors.Message = error?.errors[0]?.msg
            throw errors(error);
    }
    else if (userData) {
      throw res.status(StatusCodes.BAD_REQUEST)
        .json({ StatusCode: StatusCodes.BAD_REQUEST, Message: "Already Registered! please login ." })
    }
    else {
      const { name, mobile, email, gender, password } = req.body
      const hashPassword = await encryptPassword(password)
      const user = await User.create({ name, password: hashPassword, mobile, email, gender });
      return res.status(StatusCodes.CREATED).json({ StatusCode: StatusCodes.CREATED, "Welcome": user });
    }

  } catch (error) {
    return next(error)
  }

}
