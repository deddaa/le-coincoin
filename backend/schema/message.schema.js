import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    ads_id: {
        type : Number,
        required : true
    },
    sender_id: {
        type : Number,
        required : true
    },
    receiver_id: {
        type: Number,
        required : true
    },
    content: {
        type : String,
        required : true
    },
    timestamp: {
        type : Date,
        default : Date.now
    }
})

const Message = mongoose.model("message", messageSchema)

export default Message