const express = require('express');
const tagsRouter = express.Router();
const { getAllTags,getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

// UPDATE
tagsRouter.get('/', async (req, res) => {
  const posts = await getAllTags();

  res.send({
    posts
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const allPosts = await getPostsByTagName(tagName);
    const posts = allPosts.filter(post => {
      return post.active || (req.user && post.authorId === req.user.id);
    });
    res.send({ posts: posts })
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;