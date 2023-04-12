const db = require("../../models/index");
const User = db.user;
const { validationResult } = require("express-validator")
const { StatusCodes } = require('http-status-codes')
const { comparePasswords, encryptPassword } = require("../../util/encryptPassword")
const jwt_decode = require('jwt-decode');

// reset password
module.exports = async (req, res, next) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      const errors = new Error(error?.errors[0]?.msg)
            errors.StatusCode = StatusCodes.BAD_REQUEST
            errors.Message = error?.errors[0]?.msg
            throw errors(error);
    }
    const { oldpassword, newpassword } = req.body;
    const token = req.headers["authorization"]
    const email = jwt_decode(token).email
    const user = await User.findOne({ where: { email } });
    if (user) {
      if (comparePasswords(oldpassword, user.password)) {
        const newHashPassword = await encryptPassword(newpassword);
        const updated = await User.findOne({where:{email}},
          { password: newHashPassword },
        )
        if (updated) {
          return res.status(StatusCodes.ACCEPTED)
            .json({ StatusCode: StatusCodes.ACCEPTED, Message: "Password changed successfully" });
        }
      }
    } else {
      throw res.status(StatusCodes.BAD_REQUEST)
        .json({ StatusCode: StatusCodes.BAD_REQUEST, Message: `Cannot update User with email=${email}. Maybe User was not found !` });
    }
  } catch (error) {
    return next(error)
  }
}
