const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email : {type : String, unique : true, lowercase : true, requied : true},
    friends : [String],
    username : {type : String, requied : true, unique: true},
    fullName : {type : String, requied : true},
    password : {type : String, requied : true},
})

const tripSchema = new Schema({
    name : String,
    destination : [String],
    travelers : [ObjectId],
    startDate : Date,
    endDate : Date,
    budget : Number,
    transaction : {

    },
    createdAt : { type: Date, default : Date.now }
})

const UserModel = mongoose.model("users", userSchema);
const TripModel = mongoose.model("trips", tripSchema);

module.exports = {
    UserModel,
    TripModel
}