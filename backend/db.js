const mongoose = require("mongoose");
const { DEFAULT_DP } = require("../frontend/src/utils/constants");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email : {type : String, unique : true, lowercase : true, required : true},
    dp_url : {type: String, default : DEFAULT_DP},
    friends : [String],
    username : {type : String, required : true, unique: true},
    fullName : {type : String, required : true},
    password : {type : String, required : true},
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