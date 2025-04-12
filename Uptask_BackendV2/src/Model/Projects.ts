import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { ITask } from "./Tasks";
import { IUser } from "./Auth";
import { types } from "node:util";

export interface IProject extends Document {
   projectName: string;
   clientName: string;
   description: string;
   tasks: PopulatedDoc<ITask & Document>[];
   manager: PopulatedDoc<IUser & Document>;
   teams: PopulatedDoc<IUser & Document>[];
}

const projectShema: Schema = new Schema(
   {
      projectName: {
         type: String,
         required: true,
         trim: true,
      },
      clientName: {
         type: String,
         required: true,
         trim: true,
      },
      description: {
         type: String,
         required: true,
         trim: true,
      },
      tasks: [
         {
            type: Types.ObjectId,
            ref: "Task",
         },
      ],
      manager: {
         type: Types.ObjectId,
         ref: "User",
      },
      teams: [
         {
            type: Types.ObjectId,
            ref: "User",
         },
      ],
   },
   { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", projectShema);

export default Project;
