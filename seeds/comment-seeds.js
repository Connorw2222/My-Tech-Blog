const { Comment } = require('../models');

const commentdata = [
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 1,
      blog_id: 1
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 2,
      blog_id: 1
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 3,
      blog_id: 2
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 4,
      blog_id: 2
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 5,
      blog_id: 3
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 6,
      blog_id: 3
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 7,
      blog_id: 4
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 8,
      blog_id: 4
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 9,
      blog_id: 5
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 10,
      blog_id: 5
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 1,
      blog_id: 6
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 2,
      blog_id: 6
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 3,
      blog_id: 7
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 4,
      blog_id: 7
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 5,
      blog_id: 8
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 6,
      blog_id: 8
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 7,
      blog_id: 9
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 8,
      blog_id: 9
    },


    {
      comment_text: "Lorem ipsum dolor",
      user_id: 9,
      blog_id: 10
    },
    {
      comment_text: "Lorem ipsum dolor",
      user_id: 10,
      blog_id: 10
    }
  ];

  const seedComments = () => Comment.bulkCreate(commentdata);

  module.exports = seedComments;