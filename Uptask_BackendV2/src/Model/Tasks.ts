import mongoose, { Document, Schema, Types } from "mongoose";

const taskStatus = {
   PENDING: "pending",
   ON_HOLD: "onHold",
   IN_PROGRESS: "inProgress",
   UNDER_REVIEW: "underReview",
   COMPLETE: "completed",
} as const;

const tasksPriority = {
   LOW: "low",
   MEDIUM: "medium",
   HIGH: "high",
   URGENT: "urgent",
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];
export type TaskPriority = (typeof tasksPriority)[keyof typeof tasksPriority];

export interface ITask extends Document {
   name: string;
   description: string;
   project: Types.ObjectId;
   status: TaskStatus;
   createBy: {
      user: Types.ObjectId;
      status: TaskStatus;
      updateAt: Date;
   }[];
   notes: Types.ObjectId[];
   priority: TaskPriority;
}

export const TaskSchema: Schema = new Schema(
   {
      name: {
         type: String,
         require: true,
         trim: true,
      },
      description: {
         type: String,
         require: true,
         trim: true,
      },
      project: {
         type: Types.ObjectId,
         ref: "Project",
      },
      status: {
         type: String,
         enum: Object.values(taskStatus),
         default: taskStatus.PENDING,
      },
      createBy: [
         {
            user: {
               type: Types.ObjectId,
               ref: "User",
            },
            status: {
               type: String,
               enum: Object.values(taskStatus),
            },
            updateAt: {
               type: Date,
               default: Date.now,
            },
         },
      ],
      notes: [
         {
            type: Types.ObjectId,
            ref: "Note",
         },
      ],
      priority: {
         type: String,
         enum: Object.values(tasksPriority),
         default: tasksPriority.LOW,
      },
   },
   { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
