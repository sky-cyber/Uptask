import { z } from "zod";
import { ListTasksSchema } from "./Task";

export const ProjectSchema = z.object({
   _id: z.string(),
   projectName: z.string(),
   clientName: z.string(),
   description: z.string(),
   tasks: ListTasksSchema,
   manager: z.string(),
});

export const ProjectListSchema = z.array(
   ProjectSchema.pick({
      _id: true,
      projectName: true,
      clientName: true,
      description: true,
      manager: true,
   })
);

export type Project = z.infer<typeof ProjectSchema>;

export type Projects = Pick<
   Project,
   "_id" | "projectName" | "clientName" | "description" | "manager"
>;

export type ProjectFormData = Pick<
   Project,
   "projectName" | "clientName" | "description"
>;
