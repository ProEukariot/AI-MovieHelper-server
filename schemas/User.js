import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true, index: true },
    avoidMovies: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
