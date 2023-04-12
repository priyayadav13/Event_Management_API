const db = require("../../models/index");
const User = db.user
const Event = db.event
const { Op } = require("sequelize")
const { StatusCodes } = require('http-status-codes')
exports.all = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = 'name', order = 'desc', filter = '' } = req.query;

    const whereClause = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${filter}%` } },
        { email: { [Op.iLike]: `%${filter}%` } },
        { gender: { [Op.iLike]: `%${filter}%` } },
        { mobile: { [Op.iLike]: `%${filter}%` } }
      ]
    };

    const orderClause = [[sort, order]];

    const user = await User.findAndCountAll({
      attributes: [['name', 'User_name'], 'email', ['mobile', 'contact_no']],
      include: [
        {
          model: Event,
          attributes: ['name', 'createBy']
        }
      ],
      // where: whereClause,
      order: orderClause,
      limit: limit,
      offset: (page - 1) * limit
    });

    if (user.count > 0) {
      const totalPages = Math.ceil(user.count / limit);
      const response = {
        users: user.rows,
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalCount: user.count
      };
      return res.status(StatusCodes.OK)
        .json({ StatusCode: StatusCodes.OK, "List": response });
    }
    else {
      throw res.status(StatusCodes.PROCESSING).
        json({ StatusCode: StatusCodes.PROCESSING, Message: `Maybe User was not found!` });
    }
  }
  catch (error) {
    return next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    var id = req.params.id;
    const user = await User.findOne({
      attributes: [['name', 'user_name']],

      include: [{
        model: Event,
        attributes: ['name', 'createBy'],
      }],
      where: { id: id }
    })
    if (user) {
      return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK, "Event Details": user });
    }
    else {
      throw res.status(StatusCodes.PROCESSING).json({ StatusCode: StatusCodes.PROCESSING, Message: `Maybe Event with ${id} was not found!` });
    }

  } catch (error) {
    return next(error)
  }

}

