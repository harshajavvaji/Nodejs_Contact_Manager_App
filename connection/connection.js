const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const connect = () => {
    mongoose.connect(
        
        "mongodb+srv://harsha:1234@harsha.cvbvsmi.mongodb.net/",
        () => {
          console.log("Connected To Mongo Successfully");
        }
      );

}

module.exports = connect
