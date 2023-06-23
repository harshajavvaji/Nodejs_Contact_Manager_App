const mongoose = require("mongoose")

const contactschema = mongoose.Schema({

    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },

    name  : {
        type : String,
        required : [true, "please add the contact name"]
    },

    mail : {
        type : String,
        required : [true, "please add the contact email"]
    },
    
    phone : {
        type : String,
        required : [true, "please add the contact number"]
    },
    },
    {
        timestamps : true,
    },
)

module.exports = mongoose.model("Contact", contactschema)