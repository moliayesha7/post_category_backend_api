
const PostCatModel = require('../models/postCat.model');

// get all postCat list
exports.getPostCatList = (req, res)=> {
    // console.log('here all postCats list');
    PostCatModel.getAllPostCats((err, postCats) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('PostCats', postCats);
        res.send(postCats)
    })
}

// get postCat by ID
exports.getPostCatByID = (req, res)=>{
    //console.log('get emp by id');
    PostCatModel.getPostCatByID(req.params.id, (err, postCat)=>{
        if(err)
        res.send(err);
        console.log('single postCat data',postCat);
        res.send(postCat);
    })
}

// create new postCat
exports.createNewPostCat = (req, res) =>{
    const postCatReqData = new PostCatModel(req.body);
    console.log('postCatReqData', postCatReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        PostCatModel.createPostCat(postCatReqData, (err, postCat)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'PostCat Created Successfully', data: postCat.insertId})
        })
    }
}

// update postCat
exports.updatePostCat = (req, res)=>{
    const postCatReqData = new PostCatModel(req.body);
    console.log('postCatReqData update', postCatReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        PostCatModel.updatePostCat(req.params.id, postCatReqData, (err, postCat)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'PostCat updated Successfully'})
        })
    }
}

// delete postCat
exports.deletePostCat = (req, res)=>{
    PostCatModel.deletePostCat(req.params.id, (err, postCat)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'PostCat deleted successully!'});
    })
}