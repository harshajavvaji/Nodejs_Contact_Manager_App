const {constants} = require("../routes/constants")

const errorHandler = (err,req,res,next) =>{

    const statuscode = res.statuscode ? res.statuscode : 500;

    switch (statuscode) {
        case constants.NOT_FOUND:
            res.json({tittle : "Not found" , message : err,message, stackTrace : err.stack});
            
            break;
        case constants.VALIDATION_FAILED:
            res.json({title : "Validation Failed" , message : err,message, stackTrace : err.stack});
        
        case constants.UNAUTHORIZED:
            res.json({title : "UNAUTHORIZED" , message : err,message, stackTrace : err.stack});

        case constants.FORBIDDEN:
            res.json({title : "FORBIDDEN" , message : err,message, stackTrace : err.stack});

        case constants.SERVER_ERROR:
            res.json({title : "SERVER_ERROR" , message : err,message, stackTrace : err.stack});
        default:
            console.log("No error");
            break;
    }

    

    

}

module.exports = errorHandler;