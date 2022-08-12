
const Article = require('../../model/Article');
const formidable = require('formidable');
const ErrorResponse = require('../../utils/ErrorResponse');
const {slugify} = require('../../utils/slugify');
const fs =require('fs');
const mongoose = require('mongoose');

exports.createArticle = async(req,res,next)=>{
    try {
        const{
            title,
            category,
            tag,
            text
        }=req.fields;

        const{
            image
        }=req.files;
        
         //generate random number
         const random = Math.floor(Math.random()*10e9);
         //new unique name
         image.newFilename =  random+'-'+image.originalFilename;
         //new path
         const newPath  = __dirname+'/../../../client/public/uploads/articleImages/'+image.newFilename;
        
         const fileCopying = await new Promise((fill,reject)=>{
             fs.copyFile(image.filepath,newPath,(err)=>{
                 if(err){
                   // console.log("err upload: ",err.message)
                     reject(new ErrorResponse("image uploading error")); 
                 }
                 else
                   fill("copied successfully");
             })
         });
        
        //slugify the title name
        const titleSlug = slugify(title);
        //create new article
        const newArticle = Article({
            title:title,
            titleSlug:titleSlug,
            category:category,
            tag:tag,
            category_slug:slugify(category),
            tag_slug:slugify(tag),
            text:text,
            image:image.newFilename
        });   

        await newArticle.save();

        return res.status(201).json({
            success:true,
            message:"article create succefully"
          });
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: JSON.stringify({"error":err.message})
          });
    }
}

exports.allArticles = async(req,res,next)=>{
    try {

    const { currentPage, searchValue } = req.query;
    const perPage = 3; 
    const offset = (parseInt(currentPage)-1)*perPage;
    //count of all articles in our db 
    const articleCount = await Article.countDocuments({});

    //all arts
    var articles = {} ;
    if(searchValue === 'undefined' || !searchValue ){  
        articles = await Article.find({}).skip(offset).limit(perPage).sort({ cateatedAt: -1 });
    }else{
      let regex = new RegExp(searchValue,"i");
      articles = await Article.find({titleSlug:{$regex:regex}});
    }

        return res.status(200).json({
            success:true,
            articleCount:articleCount,
            perPage:perPage,
            allArticles:articles
          });

    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: JSON.stringify({"error":err.message})
          });
    }
}

exports.deleteArticle = async(req,res,next)=>{
    try {

        const articleId = req.params.id;
        const findArticle = await Article.findById(articleId);
        if(!findArticle){
          throw new ErrorResponse("Article not found",404);
        }
    
        await findArticle.delete();
    
        return res.status(200).json({
          success:true,
          message:"article deleted successfully"
        });
    
      } catch (err) {
        return res.status(err.statusCode||500).json({
          success:false,
          error:err.message
        });
      }
}

exports.editArticle = async(req,res,next)=>{
    try {
        const articleId = mongoose.Types.ObjectId(req.params.articleId);

        const article = await Article.findById(articleId);
        if(!article){
          throw new ErrorResponse("article not found",404);
        }
    
        return res.status(200).json({
          success:true,
          article:article
        });
        
      } catch (err) {
        return res.status(err.statusCode||500).json({
          success:false,
          error:err.message
        });
      }
}

exports.updateArticle = async(req,res,next)=>{
    try{
      const{
        title,
        category,
        tag,
        text
    }=req.fields;

    const{
        image
    }=req.files;

  
   //  throw new ErrorResponse("tag not found",404);
      const articleId = req.params.id;

      const findArticle = await Article.findById(articleId);
      if(!findArticle){ 
        throw new ErrorResponse("tag not found",404);
      }

      if(image!==undefined){
        //generate random number
        const random = Math.floor(Math.random()*10e9);
        //new unique name
        image.newFilename =  random+'-'+image.originalFilename;
        //new path
        const newPath  = __dirname+'/../../../client/public/uploads/articleImages/'+image.newFilename;
       
        const oldPath = __dirname+'/../../../client/public/uploads/articleImages/'+findArticle.image;
        //remove old image
        if(fs.existsSync(oldPath)){
          fs.unlinkSync(oldPath);
          //console.log("delete image")
        }
        //upload new image
        const fileCopying = await new Promise((fill,reject)=>{
            fs.copyFile(image.filepath,newPath,(err)=>{
                if(err){
                  // console.log("err upload: ",err.message)
                    reject(new ErrorResponse("image uploading error")); 
                }
                else
                  fill("copied successfully");
            })
        });
        //update image name in db
        findArticle.image=image.newFilename;
     }
  
      //slugify the title name
      const titleSlug = slugify(title);

      findArticle.title=title;
      findArticle.titleSlug=titleSlug;
      findArticle.category=category;
      findArticle.tag=tag;
      findArticle.category_slug=slugify(category);
      findArticle.tag_slug=slugify(tag);
      findArticle.text=text;

      await findArticle.save();
  
      return res.status(200).json({
        success:true,
        message:"article updated successfully"
      });
  
    }catch(err){
      
      return res.status(err.statusCode||500).json({
        success:false,
        error: JSON.stringify({"error":err.message})
      });
    }
  }

exports.articleCount = async(req,res,next)=>{
    try {
      const articlecount = await Article.countDocuments();
      
      return res.status(200).json({
        success:true,
        articleCount:articlecount
      });
  
    } catch (err) {
      return res.status(err.statusCode||500).json({
        success:false,
        error: err.message
      });
    }
  }