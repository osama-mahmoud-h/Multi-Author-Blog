
const Tag = require('../../model/Tag');
const ErrorResponse = require('../../utils/ErrorResponse');

const {tagValidator} = require('../../requestValidator/dashboard/tag.validator');
const {slugify} = require('../../utils/slugify');

exports.createTag = async(req,res,next)=>{
    try {
      const{
        tagName,
        tagDesc
      } = req.body;

      const tagError =  tagValidator(req);
    ///  console.log("tag Err: ",tagError)
      if(tagError!==undefined){
          throw new ErrorResponse(tagError,500);
      }

      //slugify the tag name 
      const tagSlug = slugify(tagName); 
      const oldTag = await Tag.findOne({tagSlug:tagSlug});
      if(oldTag){
        throw new ErrorResponse("this tag already exist")
      }

      const newTag = Tag({
        tagName:tagName,
        tagDesc:tagDesc?tagDesc:'',
        tagSlug:tagSlug
      });
      
      await newTag.save();

      return res.status(200).json({
          success:true,
          message:"tag created successfully",
          data:newTag
        });

    } catch (err) {
      return res.status(err.statusCode||500).json({
        success:false,
        error:err.message
      });
    }
}

exports.allTags = async(req,res,next)=>{
  try {
    const { currentPage, searchValue } = req.query;
    const perPage = 8; 
    const offset = (parseInt(currentPage)-1)*perPage;
    //count of all tags in our db 
    const tagCount = await Tag.countDocuments({});

    //all tags
    var tags = {} ;
    if(currentPage==='undefined' || !currentPage){
      tags = await Tag.find({});
    }
   else if(searchValue === 'undefined' || !searchValue ){  
      tags = await Tag.find({}).skip(offset).limit(perPage).sort({ cateatedAt: -1 });
    }else{
      let regex = new RegExp(searchValue,"i");
      tags = await Tag.find({tagName:{$regex:regex}});
    }

    return res.status(200).json({
      success:true,
      message:"tag get successfully",
      allTags: tags,
      perPage:perPage,
      tagCount:tagCount
    });

  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error:err.message
    });
  }
}

exports.deleteTag = async(req,res,next)=>{
  try {

    const tagId = req.params.id;
    const findTag = await Tag.findById(tagId);
    if(!findTag){
      throw new ErrorResponse("tag not found",404);
    }

    await findTag.delete();

    return res.status(200).json({
      success:true,
      message:"tag deleted successfully"
    });

  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error:err.message
    });
  }
}

exports.editTag = async(req,res,next)=>{
  try {
    const tagSlug = req.params.tagSlug;

    const tag = await Tag.findOne({tagSlug:tagSlug});
    if(!tag){
      throw new ErrorResponse("tag not found",404);
    }

    return res.status(200).json({
      success:true,
      message:"tag get successfully",
      tag:tag
    });
    
  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error:err.message
    });
  }
}

exports.updateTag = async(req,res,next)=>{
  try{
    const{
      tagName,
      tagDesc
    }=req.body;

     const tagError =  tagValidator(req);
     console.log("tagError : ",(typeof tagError) === 'object')
      if(tagError!==undefined){
          throw new ErrorResponse(tagError,500);
      }

    const tagId = req.params.id;

    const findTag = await Tag.findById(tagId);
    if(!findTag){
      
      throw new ErrorResponse("tag not found",404);
    }

    const tagSlug = slugify(tagName); 
    const oldTag = await Tag.findOne({tagSlug:tagSlug});
    
    if( oldTag && (oldTag._id.toHexString()!==findTag._id.toHexString()) ){
      console.log("oldTag._id!=findTag._id ",oldTag._id.toHexString()!==findTag._id.toHexString())
        throw new ErrorResponse("this tag already exist");
    }
  
    findTag.tagName=tagName;
    findTag.tagSlug=tagSlug;
    findTag.tagDesc=tagDesc;
    await findTag.save();

    return res.status(200).json({
      success:true,
      message:"tag updated successfully"
    });

  }catch(err){
    console.log("catch er",typeof (err.message))
    return res.status(err.statusCode||500).json({
      success:false,
      error: err.message
    });
  }
}

exports.tagCount = async(req,res,next)=>{
  try {
    const tagcount = await Tag.countDocuments();
    
    return res.status(200).json({
      success:true,
      tagCount:tagcount
    });

  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error: err.message
    });
  }
}