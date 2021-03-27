// const sequelize = require('../config/connection');
// const { User } = require('../models');

// const userData = require('./userData.json');
// // const userData = require('./orderData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();

// const orderSeed = require("./orderSeed");
const userSeed = require("./userSeed");
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await userSeed();
  process.exit(0);
};
seedAll();
