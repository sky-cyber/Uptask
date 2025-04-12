import mongoose, { Document, Schema, Types } from "mongoose";

export interface INote extends Document {
   content: string;
   user: Types.ObjectId;
   task: Types.ObjectId;
}

const NoteShema: Schema = new Schema(
   {
      content: {
         type: String,
         require: true,
      },
      user: {
         type: Types.ObjectId,
         ref: "User",
         require: true,
      },
      task: {
         type: Types.ObjectId,
         ref: "Task",
         require: true,
      },
   },
   { timestamps: true }
);

const Note = mongoose.model<INote>("Note", NoteShema);

export default Note;
