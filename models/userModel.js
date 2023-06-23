const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please add the user name"],

    },
    email: {
        type: String,
        required: [true,"Please enter user email "],
        // to take only unique user ids
        unique : [true, "Email already exists"]
    },
    password:{
        type: String,
        required:[true, "Please enter Password"]

    },
},
    {
        timestamps: true,
    }

)


module.exports = Userss = mongoose.model("user",userSchema)

