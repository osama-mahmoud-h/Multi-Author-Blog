class ErrorResponse extends Error{
    constructor(message,statusCode){
        super(message);
        
        if(statusCode===undefined){
            this.statusCode=500;
        }else{
            this.statusCode = statusCode;
        }
       
    }
}

module.exports = ErrorResponse ;