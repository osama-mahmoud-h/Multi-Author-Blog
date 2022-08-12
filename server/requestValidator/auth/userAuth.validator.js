const ErrorResponse = require('../../utils/ErrorResponse');
const formidable = require('formidable');
const {validateEmail} = require('../../utils/validators');

exports.userValidator = async(req,res,next)=>{
    try {
       // const articleId = req.params.id;
       
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
           userName,
           email,
           password
        } = formFields.fields;

        //filter image
        if(!image){
            errors.image="you should provide image";
        }
        if(image&&!image.mimetype.startsWith('image')){
            errors.image="invalid image";
        } 
        if(image&&image.size>1024*1024*1){
            errors.image="image size greater than 3 migabyte";
        }

        //filter fields
        if(!userName){
            errors.userName = "you should provide userName";
        }
        if(!email){
            errors.email = "you should provide email";
        }
        if(!validateEmail(email)){
            errors.email = "you should provide valid email";
        }
        if(password.length<6){
            errors.password = "password should more than 6 ";
        }
       /* if(password!==confirmPassword){
            errors.confirmPassword = "password mismatch";
        }*/
        
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
   
}