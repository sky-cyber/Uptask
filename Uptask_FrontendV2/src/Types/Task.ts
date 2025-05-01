import { z } from "zod";
import { authShemma } from "./User";

export const TaskStatusSchemma = z.enum([
   "pending",
   "onHold",
   "inProgress",
   "underReview",
   "completed",
]);

export const TaskPrioritySchemma = z.enum(["low", "medium", "high", "urgent"]);

export const LogMovTasksByUser = z.object({
   _id: z.string(),
   user: authShemma,
   status: z.string(),
   updateAt: z.string(),
});

export const cantRegisterShema = z.object({
   createBy: z.number(),
   notes: z.number(),
});

export const TaskSchemma = z.object({
   _id: z.string(),
   name: z.string(),
   description: z.string(),
   status: TaskStatusSchemma,
   project: z.string(),
   createdAt: z.string(),
   updatedAt: z.string(),
   createBy: z.array(LogMovTasksByUser),
   notes: z.array(z.string()),
   priority: TaskPrioritySchemma,
});

export const CardListShemma = z.object({
   tasks: z.array(TaskSchemma),
});

export const ListTasksSchema = z.array(
   TaskSchemma.omit({ createBy: true, notes: true })
);

export type Task = z.infer<typeof TaskSchemma>;

export type TaskCardData = Omit<Task, "createBy" | "notes">;
export type TaskFormData = Pick<Task, "name" | "description" | "priority">;
export type TaskStatus = z.infer<typeof TaskStatusSchemma>;
export type TasksPriority = z.infer<typeof TaskPrioritySchemma>;
export type TaskCantRegister = z.infer<typeof cantRegisterShema>;
export type TaskCartList = z.infer<typeof CardListShemma>;
