const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const addBlog =  require('./createBlog')

router.use('/', homeRoutes);
router.use('/', addBlog)
router.use('/api', apiRoutes);


module.exports = router;
