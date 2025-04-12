import mongoose, { Document, Schema, Types } from "mongoose";

export interface IToken extends Document {
   token: string;
   user: Types.ObjectId;
   createAt: Date;
}

const TokenShema: Schema = new Schema({
   token: {
      type: String,
      unique: true,
      require: true,
   },
   user: {
      type: Types.ObjectId,
      ref: "User",
   },
   createAt: {
      type: Date,
      default: Date.now(),
      expires: "10m",
   },
});

const Token = mongoose.model<IToken>("token", TokenShema);
export default Token;
