const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');


router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes)
router.use('/users', userRoutes);

module.exports = router;