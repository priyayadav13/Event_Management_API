const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePasswords(password, hash) {
  return bcrypt.compare(password, hash);

}

module.exports = {
  encryptPassword,
  comparePasswords,
};