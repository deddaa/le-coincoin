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

const messageSchema = new mongoose.Schema({
    ads_id: {
        type : Number,
        required : true
    },
    attendees : {type : [number]},
    sender_id: {
        type : Number,
        required : true
    },
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

const Message = mongoose.model("message", messageSchema)

export default Message