import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default:[]
    },],
  },
  { timesstamps: true});

const conversationModel = mongoose.model("Conversation", conversationSchema)

export default conversationModel