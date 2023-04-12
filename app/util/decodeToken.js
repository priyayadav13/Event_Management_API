const jwt = require('jsonwebtoken')
function decodeToken(token) {
  if (!token) {
    return ({Message:'No token provided'});
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = decodeToken;