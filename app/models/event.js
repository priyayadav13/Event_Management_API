module.exports = (sequelize, Sequelize) => {

  const Event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    venue: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    createBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
  },
  );
  return Event;
};


