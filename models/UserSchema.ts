import mongoose from "mongoose";
const Schema = mongoose.Schema;
const usereSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", usereSchema);
