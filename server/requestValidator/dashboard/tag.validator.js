

exports.tagValidator = (req)=>{
    const{
        tagName,
        tagDesc
    } = req.body;

    const errors = {};

    if (!tagName) {
        errors.tagName = 'Please provide tag name';
    }
 

    return Object.keys(errors).length===0 ? undefined : Object.values(errors)[0];
}