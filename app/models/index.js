const {Sequelize} = require("sequelize");
const sequelize = require("./sequelizeClint")

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.event = require("./event.js")(sequelize, Sequelize);

//many to many
db.user.belongsToMany(db.event,{through:'invitee',onDelete: 'cascade',onUpdate: 'cascade'})
db.event.belongsToMany(db.user,{through:'invitee',onDelete: 'cascade',onUpdate: 'cascade'})


module.exports = db;
