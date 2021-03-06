const router = require('express').Router();
const {User} = require('../../models');

router.get('/all', (req, res) => {
    console.log('Hi');
    User.findAll({
        // attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new user trouble area! 
router.post('/', (req, res) => {
    console.log(req.body);
    return User.create(req.body)
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.firstName = dbUserData.firstName;
        req.session.lastName = dbUserData.lastName;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;

        res.json(dbUserData);
      })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
   }
  }).then(dbUserData => {
    console.log('user data' , dbUserData)
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email!' });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.firstName = dbUserData.firstName;
      req.session.lastName = dbUserData.lastName;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

//logout 
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

module.exports = router;