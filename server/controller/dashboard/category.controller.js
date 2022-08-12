
const Category = require('../../model/Category');
const ErrorResponse = require('../../utils/ErrorResponse');

const {categoryValidator} = require('../../requestValidator/dashboard/category.validator');
const {slugify} = require('../../utils/slugify');

exports.createCategory = async(req,res,next)=>{
    try {
      const{
        categoryName,
        categoryDesc
      } = req.body;

      const categoryError =  categoryValidator(req);
    //  console.log("categ Err: ",categoryError)
      if(categoryError!==undefined){
          throw new ErrorResponse(categoryError,500);
      }

      //slugify the category name 
      const categorySlug = slugify(categoryName); 
      const oldCatgory = await Category.findOne({categorySlug:categorySlug});
      if(oldCatgory){
        throw new ErrorResponse("this category already exist")
      }

      const newCategory = Category({
        categoryName:categoryName,
        categoryDesc:categoryDesc?categoryDesc:'',
        categorySlug:categorySlug
      });
      
      await newCategory.save();

      return res.status(200).json({
          success:true,
          message:"category created successfully",
          data:newCategory
        });

    } catch (err) {
      return res.status(err.statusCode||500).json({
        success:false,
        error:err.message
      });
    }
}

exports.allCategories = async(req,res,next)=>{
  try {
    const { currentPage, searchValue } = req.query;
    const perPage = 8; 
    const offset = (parseInt(currentPage)-1)*perPage;
    //count of all categories in our db 
    const categoryCount = await Category.countDocuments({});

    //all categories
    var categories = {} ;
    if(currentPage==='undefined' || !currentPage){
      categories = await Category.find({});
    }
    else if(searchValue === 'undefined' || !searchValue ){  
      categories = await Category.find({}).skip(offset).limit(perPage).sort({ cateatedAt: -1 });
    }else{
      let regex = new RegExp(searchValue,"i");
      categories = await Category.find({categoryName:{$regex:regex}});
    }

    return res.status(200).json({
      success:true,
      message:"category get successfully",
      allCategories: categories,
      perPage:perPage,
      categoryCount:categoryCount
    });

  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error:err.message
    });
  }
}

exports.deleteCategory = async(req,res,next)=>{
  try {

    const categoryId = req.params.id;
    const findCategory = await Category.findById(categoryId);
    if(!findCategory){
      throw new ErrorResponse("Category not found",404);
    }

    await findCategory.delete();

    return res.status(200).json({
      success:true,
      message:"Category deleted successfully"
    });

  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error:err.message
    });
  }
}

exports.editCategory = async(req,res,next)=>{
  try {
    const categorySlug = req.params.categorySlug;

    const category = await Category.findOne({categorySlug:categorySlug});
    if(!category){
      throw new ErrorResponse("Category not found",404);
    }

    return res.status(200).json({
      success:true,
      message:"Category get successfully",
      category:category
    });
    
  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error:err.message
    });
  }
}

exports.updateCategory = async(req,res,next)=>{
  try{
    const{
      categoryName,
      categoryDesc
    }=req.body;

     const categoryError =  categoryValidator(req);
      if(categoryError!==undefined){
          throw new ErrorResponse(categoryError,500);
      }

    const categoryId = req.params.id;

    const findCategory = await Category.findById(categoryId);
    if(!findCategory){
      
      throw new ErrorResponse("Category not found",404);
    }

    const categorySlug = slugify(categoryName); 
    const oldCategory = await Category.findOne({categorySlug:categorySlug});
    
    if( oldCategory && (oldCategory._id.toHexString()!==findCategory._id.toHexString()) ){
        throw new ErrorResponse("this Category already exist");
    }
  
    findCategory.categoryName=categoryName;
    findCategory.categorySlug=categorySlug;
    findCategory.categoryDesc=categoryDesc;
    await findCategory.save();

    return res.status(200).json({
      success:true,
      message:"Category updated successfully"
    });

  }catch(err){
    return res.status(err.statusCode||500).json({
      success:false,
      error: err.message
    });
  }
}

exports.categoryCount = async(req,res,next)=>{
  try {
    const categorycount = await Category.countDocuments();
    
    return res.status(200).json({
      success:true,
      categoryCount:categorycount
    });

  } catch (err) {
    return res.status(err.statusCode||500).json({
      success:false,
      error: err.message
    });
  }
}