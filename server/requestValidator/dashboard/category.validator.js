

exports.categoryValidator = (req)=>{
    const{
        categoryName,
        categoryDesc
    } = req.body;

    const errors = {};

    if (!categoryName) {
        errors.tagName = 'Please provide category name';
    }
  

    return Object.keys(errors).length===0 ? undefined : Object.values(errors)[0];
}
