var dbConn = require('../../config/db.config');

var PostCat = function (postCat) {
    this.name = postCat.name;
    this.slug = postCat.slug;
    this.status = postCat.status ? postCat.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
}

// get all postCats
PostCat.getAllPostCats = (result) => {
    dbConn.query('SELECT * FROM postcats WHERE is_deleted=0', (err, res) => {
        if (err) {
            console.log('Error while fetching postCats', err);
            result(null, err);
        } else {
            console.log('PostCats fetched successfully');
            result(null, res);
        }
    })
}

// get postCat by ID from DB
PostCat.getPostCatByID = (id, result) => {
    dbConn.query('SELECT * FROM postcats WHERE id=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching postCat by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

// create new postCat
PostCat.createPostCat = (postCatReqData, result) => {
    dbConn.query('INSERT INTO postcats SET ? ', postCatReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            console.log('PostCat created successfully');
            result(null, res)
        }
    })
}

// update postCat
PostCat.updatePostCat = (id, postCatReqData, result) => {
    dbConn.query("UPDATE postcats SET name=?,slug=? WHERE id = ?", [postCatReqData.name, postCatReqData.slug,  id], (err, res) => {
        if (err) {
            console.log('Error while updating the postCat');
            result(null, err);
        } else {
            console.log("PostCat updated successfully");
            result(null, res);
        }
    });
}

// delete postCat
PostCat.deletePostCat = (id, result) => {
    // dbConn.query('DELETE FROM postCats WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the postCat');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("UPDATE postcats SET is_deleted=? WHERE id = ?", [1, id], (err, res) => {
        if (err) {
            console.log('Error while deleting the postCat');
            result(null, err);
        } else {
            console.log("PostCat deleted successfully");
            result(null, res);
        }
    });
}

module.exports = PostCat;