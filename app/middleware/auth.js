const db = require("../models");
const User = db.user;
const { StatusCodes } = require('http-status-codes')
const jwt_decode = require("jwt-decode")

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw res.status(StatusCodes.UNAUTHORIZED)
                .json({ StatusCode: StatusCodes.UNAUTHORIZED, Message: `Set authorization Token` });
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw res.status(StatusCodes.UNAUTHORIZED)
                .json({ StatusCode: StatusCodes.UNAUTHORIZED, Message: `Unauthorized User` });
        }

        const { email } = await jwt_decode(token)
        const user = await User.findOne({ where: { email} })
        if (user) {
            return next()
        }else{
            throw res.status(StatusCodes.UNAUTHORIZED)
                .json({ StatusCode: StatusCodes.UNAUTHORIZED, Message: `Invalid Token` });
        }
    } catch (error) {
        return next(error)
    }
}

