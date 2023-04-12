const db = require("../../models/index");
const User = db.user;
const Event = db.event;
const { StatusCodes } = require('http-status-codes')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id;
    const event = await Event.findOne({ where: { id: id } });
    if (!event) {
      throw res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, Message: `Event with id=${id} was not found!` });
    }
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw res.status(StatusCodes.BAD_REQUEST).json({ StatusCode: StatusCodes.BAD_REQUEST, Message: `User with email=${email} was not found!` });
    }
    event.addUser(user)
    return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, Message: "Invitation Added" });
  } catch (error) {
    return next(error)
  }
}
