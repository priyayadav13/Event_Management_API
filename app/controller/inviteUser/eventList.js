const db = require("../../models/index");
const User = db.user
const Event = db.event
const { Op } = require("sequelize")
const { StatusCodes } = require('http-status-codes')
exports.findAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = 'startDate', order = 'desc', filter = '' } = req.query;

    const whereClause = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${filter}%` } },
        { venue: { [Op.iLike]: `%${filter}%` } }
      ]
    };

    const orderClause = [[sort, order]];

    const event = await Event.findAndCountAll({
      attributes: [['name', 'event_name'], 'startDate', 'venue'],
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          through: { attributes: [] }
        }
      ],
      where: whereClause,
      order: orderClause,
      limit: limit,
      offset: (page - 1) * limit
    });

    if (event.count > 0) {
      const totalPages = Math.ceil(event.count / limit);
      const response = {
        events: event.rows,
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalCount: event.count
      };
      return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, "List": response });
    }
    else {
      throw res.status(StatusCodes.PROCESSING).json({ StatusCode: StatusCodes.PROCESSING, Message: `Maybe Event was not found!` });
    }
  }
  catch (error) {
    return next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    var id = req.params.id;
    const event = await Event.findOne({
      attributes: [['name', 'event_name']],

      include: [{
        model: User,
        attributes: ['name', ['email', 'contactInfo']],
      }],
      where: { id: id }
    })
    if (event) {
      return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, "Event Details": event});
    }
    else {
      throw res.status(StatusCodes.PROCESSING).json({ StatusCode: StatusCodes.PROCESSING, Message: `Maybe Event with ${id} was not found!` });
    }

  } catch (error) {
    return next(error)
  }

}
