const db = require("../../models");
const Event = db.event;
const jwt_decode = require('jwt-decode');
const { StatusCodes } = require('http-status-codes')

// reset password
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
    const creator = await jwt_decode(token).email
    const id = req.params.id;
    const event = await Event.findOne({ where: { id } });
    if (creator != event.createBy) {
      throw res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ StatusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION, Message: `Only Event creator have delete Privileges` });
    }
    if (event) {
      const name = req.body.name;
      const result = await Event.update({ where: { id } }, { name })
      return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, Message: "Event was Update successfully!", Event: result });
    } else {
      throw res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, Message: `Cannot update Event with id=${id}. Maybe Event was not found!` });
    }
  } catch (error) {
    return next(error)
  }

};
