import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);

