const jwt = require('jsonwebtoken');
const db = require("../models/index");
const User = db.user;

async function signToken(email) {
  const userinfo = await User.findOne({ where: { email } })
  const token = jwt.sign(
    {
      id: userinfo.id,
      email: userinfo.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
  console.log(token)
  return token
}

module.exports = signToken