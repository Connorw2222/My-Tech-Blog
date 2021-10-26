const router = require("express").Router();
const withAuth = require('../../utils/auth');
const { Blog, User, Comment } = require("../../models");

// get all Blogs
router.get("/", (req, res) => {
  console.log(req.session);
  console.log("Blog route called");
  Blog.findAll({
    attributes: ["id", "title", "description"],
  })
    .then((dbBlogData) => {
      res.json(dbBlogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get one Blog
router.get('/getBlog/:id', (req, res) => {
  console.log("params id", req.params.id)
  Blog.findOne({   
    where: {
      id: req.params.id
    },
    attributes: [ "id", "title", "description"],
  })
    .then(singleBlog => {
      console.log("single Blog ", singleBlog)
      if (!singleBlog) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(singleBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all Blogs by category
router.get('/:category', (req, res) => {
  Blog.findAll({
      where: {
        category: req.params.category
      },
      attributes: ["id", "title", "description"],
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//post a Blog
router.post("/", (req, res) => {
  const body = req.body;
  Blog.create({
  ...body, userId: req.session.userId
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/update/:id',  (req, res) => {
  Blog.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Blog found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
