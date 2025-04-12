import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   confirmed: boolean;
}

const UserSchemma: Schema = new Schema({
   name: {
      type: String,
      require: true,
      trim: true,
   },
   email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
   },
   password: {
      type: String,
      require: true,
   },
   confirmed: {
      type: Boolean,
      default: false,
   },
});

const User = mongoose.model<IUser>("User", UserSchemma);

export default User;
