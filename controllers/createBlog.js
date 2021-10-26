const router = require('express').Router();
const sequelize = require('../config/connection');

// add a recipe route
router.get('/addBlog', ( req, res) => {
   if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('createBlog');
})

module.exports = router;