const Article = require("../../model/Article");
const Visitor = require("../../model/Visistor");
const { slugify } = require("../../utils/slugify");

exports.get_all_home_article = async(req,res,next)=>{
    try {
      
        const { currentPage, searchValue } = req.query;
      //  console.log("page ",req.query)
        const perPage = 4; 
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
                error: err.message
            });
        }
}

exports.get_home_tag_category = async(req,res,next)=>{
    try {
        const allUsedCategories = await Article.distinct('category');
        const allUsedTags = await Article.distinct('tag');

        return res.status(200).json({
            success:true,
            allUsedCategories:allUsedCategories,
            allUsedTags:allUsedTags
        });

    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.get_recent_old_articles = async(req,res,next)=>{
    try {
        const recentArticles = await Article.find({}).limit(3).sort({createdAt:1});
        const oldArticles = await Article.find({}).limit(3).sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            recentArticles:recentArticles,
            oldArticles:oldArticles
        });

    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.get_articles_of_category = async(req,res,next)=>{
    try {
        let {currentPage,categorySlug} = req.query;
        const perPage = 2;
        const offset = (parseInt(currentPage)-1)*perPage;

        const articleCount = await Article.find({category_slug:slugify(categorySlug)}).countDocuments();
        const articles = await Article.find({category_slug:slugify(categorySlug)}).skip(offset).limit(perPage).sort({ createAt: -1 });

        return res.status(200).json({
            success:true,
            perPage:perPage,
            articlesOfCategory:articles,
            articlesOfCategoryCount:articleCount
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.get_articles_of_tag = async(req,res,next)=>{
    try {
        let {currentPage,tagSlug} = req.query;
        tagSlug = slugify(tagSlug);
        const perPage = 2;
        const offset = (parseInt(currentPage)-1)*perPage;

        const articleCount = await Article.find({tag_slug:tagSlug}).countDocuments();
        const articles = await Article.find({ tag_slug: tagSlug }).skip(offset).limit(perPage).sort({ createAt: -1 });

        return res.status(200).json({
            success:true,
            perPage:perPage,
            articlesOfTag:articles,
            articlesOfTagCount:articleCount
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.get_popular_articles = async(req,res,next)=>{
    try {
        const recentArticles = await Article.find({}).limit(4).sort({createdAt:1});

        return res.status(200).json({
            success:true,
            popularArticles:recentArticles,
        });

    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: err.message
        });
    }
}

exports.addVisitor = async(req,res,next)=>{
    try {
     
     const visitor = await  Visitor.create({});
      return res.status(200).json({
        success:true
      });
  
    } catch (err) {
      return res.status(err.statusCode||500).json({
        success:false,
        error: err.message
      });
    }
  }