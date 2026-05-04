import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    user_id : {
        type : Number,
        required : true
    },
    emoji : {type : String , required : true}
},{ _id : false })

const contentSchema = new mongoose.Schema({
  sender_id: {
    type: Number,
    required: true,
  },
  
  content: { type: String, required: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  reactions : {type : [reactionSchema] }
});

const convSchema = new mongoose.Schema({
    ads_id: {
        type : Number,
        required : true
    },
    //attendees : {type : [Number]},
    receiver_id: {
        type: Number,
        required : true
    },
    content: {
        type : [contentSchema],
        required : true
    },
    timestamp: {
        type : Date,
        default : Date.now
    }
})

const Message = mongoose.model("message", convSchema)

export default Message