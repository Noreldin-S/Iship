const {
  IshipClient,

} = require('shipit');

const upsClient = new IshipClient({
  licenseNumber: process.env.UPS_LICENSE,
  userId: process.env.UPS_USER_ID,
  password: process.env.UPS_PASSWORD
});


module.exports = {
  upsClient,
  fedexClient,
};