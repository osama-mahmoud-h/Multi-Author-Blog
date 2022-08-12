const Article = require('../../model/Article');
const User = require('../../model/User')
const Comment = require('../../model/Comment')

const ErrorResponse = require('../../utils/ErrorResponse');
const mongoose =require('mongoose');

exports.get_details_of_article = async(req,res,next)=>{
    try {
        const articleId = req.params.articleId;
       // console.log("articleId: ",articleId)
        const findArticle = await Article.findById(mongoose.Types.ObjectId(articleId));

        if(!findArticle){
            throw new ErrorResponse("article not found");
        }
        const relatedArticles = await Article.aggregate([
            {
            $match : {
                $and : [{
                    category_slug : {
                        $eq:findArticle.category_slug
                    }
                },
                {
                    _id:{
                        $ne:findArticle._id
                    }
                }
            ]
            }
        }
    ]).limit(3);

        const readMore = await Article.aggregate([
            {
                $match:{
                    $and:[
                        {
                            category_slug:{
                                $eq:findArticle.category_slug
                            }
                        },
                        {
                            _id:{
                                $ne:findArticle._id
                            }
                        }
                    ]
                }
            }
        ]).limit(1);

        const moreTags =  await Article.distinct('tag_slug',{
            _id:{
                $ne:findArticle._id
            }
        });

        //increase views 
        findArticle.views++;
        await findArticle.save();

        return res.status(200).json({
            success:true,
            relatedArticles:relatedArticles,
            readArticle:findArticle,
            moreTags:moreTags

        });

    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.get_likes_of_article = async(req,res,next)=>{
    try {
        const{
            articleId,
            userId
        } = req.body;

        if(!articleId||!userId){
            throw new ResponseError("something went wrong try again");
        }

        const article = await Article.findById(mongoose.Types.ObjectId(articleId));
        const user = await User.findById(mongoose.Types.ObjectId(userId));
        if(!article||!user){
            throw new ResponseError("something went wrong try again");
        }
        
        let index=user.likes.findIndex(like=>{return like.articleId==articleId;});
        let status = '';

        if(index>-1){
           status = user.likes[index].status; 
        }

        return res.status(200).json({
            success:true,
            status:status
        });
        
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.like_article = async(req,res,next)=>{
    try {
        const{
            articleId,
            userId
        } = req.body;

        if(!articleId||!userId){
            throw new ResponseError("something went wrong try again");
        }

        const article = await Article.findById(mongoose.Types.ObjectId(articleId));
        const user = await User.findById(mongoose.Types.ObjectId(userId));
        if(!article||!user){
            throw new ResponseError("something went wrong try again");
        }
        
        let index=user.likes.findIndex(like=>{return like.articleId==articleId;});

        let status='';

        if(index>-1){
             status = user.likes[index].status;
            // if status = like
            if(status==='like'){ //remove like
                user.likes.splice(index,1);
                article.like--;
                status='';
            }else{ // replace dislike with like
                user.likes[index].status='like';
                status='like';
                article.like++;
                article.dislike--;
            }
        }else{ // if no like 
            user.likes.push({
                articleId:articleId,
                status:'like'
            });
            status='like';
            article.like++;
        }
        await user.save();
        await article.save();

        return res.status(200).json({
            success:true,
            status:status,
            like:article.like,
            dislike:article.dislike
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.dislike_article = async(req,res,next)=>{
    try{
    const{
        articleId,
        userId
    } = req.body;

    if(!articleId||!userId){
        throw new ResponseError("something went wrong try again");
    }

    const article = await Article.findById(mongoose.Types.ObjectId(articleId));
    const user = await User.findById(mongoose.Types.ObjectId(userId));
    if(!article||!user){
        throw new ResponseError("something went wrong try again");
    }
    
    let index=user.likes.findIndex(like=>{return like.articleId==articleId;});
  
    let status ='';
    if(index>-1){
         status = user.likes[index].status;
        // if status = like
        if(status==='dislike'){ //remove like
            user.likes.splice(index,1);
            article.dislike--;
            status='';
        }else{ // replace dislike with like
            article.like--;
            user.likes[index].status='dislike';
            status='dislike';
            article.dislike++;
        }
    }else{ // if no like 
        user.likes.push({
            articleId:articleId,
            status:'dislike'
        });
        status='dislike';
        article.dislike++;
    }
    await user.save();
    await article.save();

    return res.status(200).json({
        success:true,
        status:status,
        like:article.like,
        dislike:article.dislike
 
    });
} catch (err) {
    return res.status(err.statusCode||500).json({
        success:false,
        error: err.message
    });
}
}

exports.user_comment = async(req,res,next)=>{
    try {
        const{
            articleId,
            userId,
            comment
        }=req.body;
        
        const article = await Article.findById(mongoose.Types.ObjectId(articleId));
        const user = await User.findById(mongoose.Types.ObjectId(userId));
        if(!user||!article){
            throw new ErrorResponse("something went error",404);
        }

        if(!comment){
            throw new ErrorResponse("comment shouldn't be empty");
        }

       const newComment =  Comment({
        articleId:mongoose.Types.ObjectId(articleId),
        content:comment,
        author:mongoose.Types.ObjectId(userId),
        
       });

       await newComment.save();

        return res.status(201).json({
            success:true,
            message:"comment created successfully"
          
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.all_article_comments = async(req,res,next)=>{
    try {
        const{articleId} = req.params;
        const comments = await Comment.find({articleId:mongoose.Types.ObjectId(articleId)})
                                      .populate({ path: 'author', select: 'userName _id image role ' });
            

        return res.status(200).json({
            success:true,
            comments:comments
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}


exports.delete_comment = async(req,res,next)=>{
    try {
        const{commentId}=req.params;
        await Comment.deleteOne({_id:mongoose.Types.ObjectId(commentId)});

        return res.status(200).json({
            success:true,
            message:'comment deleted successfully'
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: "some thing went error try again"
        });
    }
}



