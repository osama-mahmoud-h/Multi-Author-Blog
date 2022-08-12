const ErrorResponse = require('../../utils/ErrorResponse');
const formidable = require('formidable');

exports.articleValidator = async(req,res,next)=>{
    try {
        const articleId = req.params.id;
       
        let errors = {};
        const formData = formidable({
            multiples: true
        });

        const formFields = await new Promise((fill,reject)=>{
            formData.parse(req,async(err,fields,files)=>{
                if(err){
                    reject(new ErrorResponse("something went wrong"));
                    return;
                }
                fill({
                    fields,
                    files
                });
            });
        });

        const {image} =formFields.files;
       
        const{
            title,
            category,
            tag,
            text
        } = formFields.fields;
    
         //filter image
        if(articleId===undefined&&!image){
            errors.image="you should provide image";
        }
        if(articleId===undefined&&image&&!image.mimetype.startsWith('image')){
            errors.image="invalid image";
        } 
        if(articleId===undefined&&image&&image.size>1024*1024*3){
            errors.image="image size greater than 3 migabyte";
        }

        //filter fields
        if(!title){
            errors.title = "you should provide title";
        }
        if(!category){
            errors.category = "you should provide category";
        }
        if(!tag){
            errors.tag = "you should provide tag";
        }
        if(!text){
            errors.text = "you should provide text";
        }
        
        if(Object.keys(errors).length>0){
            
            return res.status(500).json({
                success:false,
                error: JSON.stringify(errors)
              });
        }else{
            req.fields=formFields.fields;
            req.files=formFields.files;
           
            return next();
        }
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error: JSON.stringify({"error":err.message})
        });
    }
   
  ///  return Object.keys(errors).length===0 ? undefined : Object.values(errors)[0];
}