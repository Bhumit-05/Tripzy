const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email : {type : String, unique : true, lowercase : true, requied : true},
    username : {type : String, requied : true, unique: true},
    fullName : {type : String, requied : true},
    password : {type : String, requied : true},
})

const UserModel = mongoose.model("users", userSchema);

module.exports = {
    UserModel
}