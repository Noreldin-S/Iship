const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');
const ordersRoutes = require('./orders-routes.js');
const ratesRoutes = require('./rates-routes.js');
const signupRoutes = require('./signup-routes.js');
const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./logout-routes.js');
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/orders', ordersRoutes);
router.use('/rates', ratesRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);

module.exports = router;