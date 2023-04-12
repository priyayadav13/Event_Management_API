const db = require("../../models/index");
const Event = db.event;
const jwt_decode = require('jwt-decode');
const { StatusCodes } = require('http-status-codes')

//delete single user
exports.delete = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
    const creator = await jwt_decode(token).email
    const id = req.params.id;
    const event = await Event.findOne({ where: { id:id } })

    if(!event) {
       throw res.status(StatusCodes.BAD_REQUEST)
         .json({ StatusCode: StatusCodes.BAD_REQUEST, Message: `Cannot delete Event with id=${id}. Maybe Event was not found!` });
     }else{
       if (creator != event.createBy) {
         throw res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
           .json({ StatusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION, Message: `Only Event creator have delete Privileges` });
       }else{
          await Event.destroy({ where: { id:id } })
          return res.status(StatusCodes.OK)
            .json({ StatusCode: StatusCodes.OK, Message: "Event was deleted successfully!" });
       }
     }
  } catch (error) {
    return next(error)
  }
};
