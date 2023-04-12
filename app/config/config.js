require('dotenv').config()
const config = {
  host:process.env.HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB,
  port:process.env.PORT1,
  jwt_secret:process.env.JWT_SECRET
}
module.exports = config