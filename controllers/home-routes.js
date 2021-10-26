const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment} = require('../models');


//Home page route 
router.get('/', (req, res) => {
 
   console.log(req.session)
 
    Blog.findAll({
         attributes: [
            'id',
            'title',
            'description',                  
        ],
        order: [['created_at', 'DESC']], 
        include: [
            {
              model: User,
              attributes: ['email']
            }
        ]
    })
        .then(dbPostData => {
          const blogs = dbPostData.map(blog => blog.get({ plain: true }));
          console.log("Blogs", blogs);
          res.render('index', {            
          blogs,
          loggedIn: req.session.loggedIn
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        }); 
}); 

// get single Blog
router.get('/singleBlog/:id', (req,res) => {
  Blog.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'category',
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'user_id',
            'comment_text',
            'created_at', 
            'updated_at'
          ],
          include: [
            {
              model: User, 
              attributes: [
                'first_name', 
                'last_name'
              ]
            }
          ]
        }
    ]
  })
  .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const blog = dbPostData.get({ plain: true });
      blog.comments.map(comment => {
        comment.nickname = comment.user.first_name[0].toUpperCase() + comment.user.last_name[0].toUpperCase();
        console.log(comment);
      })
      // console.log(Blog.comments[0])
      res.render('singleBlog', {
        blog,
        loggedIn: req.session.loggedIn
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

// router.get('/category/:category', (req, res) => {
//   console.log(req.params.category)
//   Blog.findAll({
//       where: {
//         category: req.params.category
//       },
//       attributes: [
//           'id',
//           'title',
//           'descrition'
//       ],
//       order: [['created_at', 'DESC']], 
//      })
//       .then(dbPostData => {
//         if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this category' });
//           return;
//         }
//         const Blogs = dbPostData.map(Blog => Blog.get({ plain: true }));
//         const category = req.params.category;
//         res.render('category', {
//           Blogs,
//           category,
//           loggedIn: req.session.loggedIn
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

//login / signup page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
