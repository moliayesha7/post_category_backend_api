var dbConn = require('../../config/db.config');

var Post = function (post) {
    this.title = post.title;
    this.slug = post.slug;
    this.author = post.author;
    this.content = post.content;
    this.status = post.status ? post.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
}

// get all posts
Post.getAllPosts = (result) => {
    dbConn.query('SELECT * FROM posts WHERE is_deleted=0', (err, res) => {
        if (err) {
            console.log('Error while fetching posts', err);
            result(null, err);
        } else {
            console.log('Posts fetched successfully');
            result(null, res);
        }
    })
}

// get post by ID from DB
Post.getPostByID = (id, result) => {
    dbConn.query('SELECT * FROM posts WHERE id=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching post by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

// create new post
Post.createPost = (postReqData, result) => {
    dbConn.query('INSERT INTO posts SET ? ', postReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            console.log('Post created successfully');
            result(null, res)
        }
    })
}

// update post
Post.updatePost = (id, postReqData, result) => {
    dbConn.query("UPDATE posts SET title=?,slug=?,author=?,content=? WHERE id = ?", [postReqData.title, postReqData.slug, postReqData.author, postReqData.content, id], (err, res) => {
        if (err) {
            console.log('Error while updating the post');
            result(null, err);
        } else {
            console.log("Post updated successfully");
            result(null, res);
        }
    });
}

// delete post
Post.deletePost = (id, result) => {
    // dbConn.query('DELETE FROM posts WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the post');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("UPDATE posts SET is_deleted=? WHERE id = ?", [1, id], (err, res) => {
        if (err) {
            console.log('Error while deleting the post');
            result(null, err);
        } else {
            console.log("Post deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Post;