const db = require("../../models/index");
const Event = db.event;
const { validationResult } = require("express-validator")
const { StatusCodes } = require('http-status-codes')
const jwt_decode = require('jwt-decode');
// event create
module.exports = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            const errors = new Error(error?.errors[0]?.msg)
            errors.StatusCode = StatusCodes.BAD_REQUEST
            errors.Message = error?.errors[0]?.msg
            throw errors
        }
        else {
            const token = req.headers["authorization"]
            const createBy = jwt_decode(token).email
            if (!createBy) {
                throw res.status(StatusCodes.UNAUTHORIZED)
                    .json({ StatusCode: StatusCodes.UNAUTHORIZED, Message: `Unauthorized User` });
            }
            const { name, startDate, endDate, venue } = req.body;
            const event = await Event.create({ name, startDate, endDate, venue, createBy });
            if (event) {
                return res.status(StatusCodes.CREATED)
                    .json({ StatusCode: StatusCodes.CREATED, Message: "Successfully Event Created.", "Event Info ": event });
            }
        }
    } catch (error) {
        return next(error)
    }
}