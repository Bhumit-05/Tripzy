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
    destination : String,
    travelers : [ObjectId],
    startDate : Date,
    endDate : Date,
    createdAt : { type: Date, default : Date.now },
    status: {
        type: String,
        enum: ["not_started", "in_progress", "completed"],
        default: "not_started",
      },
})

const activitySchema = new Schema({
    tripId : ObjectId,
    activity : String,
    date : Date
})

const transactionSchema = new Schema({
    userId : ObjectId,
    tripId : ObjectId,
    amount : Number,
    description : String,
    date : { type: Date, default: Date.now }
})

const UserModel = mongoose.model("users", userSchema);
const TripModel = mongoose.model("trips", tripSchema);
const ActivityModel = mongoose.model("activities", activitySchema);
const TransactionModel = mongoose.model("transactions", transactionSchema);

module.exports = {
    UserModel,
    TripModel,
    ActivityModel,
    TransactionModel
}