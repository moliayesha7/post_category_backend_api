
const PostModel = require('../models/post.model');

// get all post list
exports.getPostList = (req, res)=> {
    //console.log('here all posts list');
    PostModel.getAllPosts((err, posts) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Posts', posts);
        res.send(posts)
    })
}

// get post by ID
exports.getPostByID = (req, res)=>{
    //console.log('get emp by id');
    PostModel.getPostByID(req.params.id, (err, post)=>{
        if(err)
        res.send(err);
        console.log('single post data',post);
        res.send(post);
    })
}

// create new post
exports.createNewPost = (req, res) =>{
    const postReqData = new PostModel(req.body);
    console.log('postReqData', postReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        PostModel.createPost(postReqData, (err, post)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Post Created Successfully', data: post.insertId})
        })
    }
}

// update post
exports.updatePost = (req, res)=>{
    const postReqData = new PostModel(req.body);
    console.log('postReqData update', postReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        PostModel.updatePost(req.params.id, postReqData, (err, post)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Post updated Successfully'})
        })
    }
}

// delete post
exports.deletePost = (req, res)=>{
    PostModel.deletePost(req.params.id, (err, post)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Post deleted successully!'});
    })
}