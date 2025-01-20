const mongoose = require("mongoose");
const { DEFAULT_DP } = require("../frontend/src/utils/constants");
const { symbol } = require("zod");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email : {type : String, unique : true, lowercase : true, required : true},
    dp_url : {type: String, default : DEFAULT_DP},
    friends : [String],
    username : {type : String, required : true, unique: true},
    fullName : {type : String, required : true},
    password : {type : String, required : true},
    currencyCode : {type : String, default : "INR"},
    conversionRateToUSD : {type : Number, default : 86.5471}
})

const tripSchema = new Schema({
    name : String,
    destination : String,
    travellers : [ObjectId],
    startDate : Date,
    endDate : Date,
    createdAt : { type: Date, default : Date.now },
    status: {
        type: String,
        enum: ["not_started", "in_progress", "completed"],
        default: "not_started",
    },
    currencyCode : {type : String, default : "INR"},
    conversionRateToUSD : {type : Number, default : 86.5471}
})

const activitySchema = new Schema({
    tripId : ObjectId,
    activity : String,
    date : Date,
    status : {type : Boolean, default : false}
})

const transactionSchema = new Schema({
    userId : ObjectId,
    tripId : ObjectId,
    amount : Number,
    description : String,
    date : { type: Date, default: Date.now }
})

const currencySchema = new Schema({
    currencyCode : {type : String},
    symbol : String,
    rateToUSD : Number
})

const UserModel = mongoose.model("users", userSchema);
const TripModel = mongoose.model("trips", tripSchema);
const ActivityModel = mongoose.model("activities", activitySchema);
const TransactionModel = mongoose.model("transactions", transactionSchema);
const CurrencyModel = mongoose.model("currencies", currencySchema);

module.exports = {
    UserModel,
    TripModel,
    ActivityModel,
    TransactionModel,
    CurrencyModel
}