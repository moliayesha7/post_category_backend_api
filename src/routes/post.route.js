const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const postCatController = require('../controllers/postCat.controller');
// get all posts
router.get('/', postController.getPostList);

// get post by ID
router.get('/:id', postController.getPostByID);

// create new post
router.post('/', postController.createNewPost);

// update post
router.put('/:id', postController.updatePost);

// delete post
router.delete('/:id', postController.deletePost);





// get all Category
router.get('/postCat', postCatController.getPostCatList);

// get Category by ID
router.get('/postCat/:id', postCatController.getPostCatByID);

// create new Category
router.post('/postCat', postCatController.createNewPostCat);

// update Category
router.put('/postCat/:id', postCatController.updatePostCat);

// delete Category
router.delete('/postCat/:id', postCatController.deletePostCat);


module.exports = router;