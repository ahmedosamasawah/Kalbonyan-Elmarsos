const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Mysql@742002", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
