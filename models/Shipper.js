const {
  IshipClient,

} = require('shipit');

const IshipClient = new IshipClient({
  licenseNumber: process.env.Iship_LICENSE,
  userId: process.env.Iship_USER_ID,
  password: process.env.Iship_PASSWORD
});


module.exports = {
  IshipClient,
};