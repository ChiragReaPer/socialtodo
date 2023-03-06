import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userAuthToken: {
    type: String,
    required: true,
  },

  userRefreshToken: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Number,
    default: Date.now,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    //type: String,
    index: true,
    required: true,
  },

  tokenExpiredOn: { type: Number },
});

const Token = mongoose.model("token", TokenSchema);

export default Token;
