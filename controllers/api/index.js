const router = require('express').Router();

const userRoutes = require('./user-routes');
//const carrierRoutes = require('./carrier-routes');

router.use('/users', userRoutes);
//router.use('/carrier', carrierRoutes);

module.exports = router;