import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Comment = mongoose.model("Comment",commentSchema);

export default Comment