import type, { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../Model/Tasks";
import { HandleErrorNotFound, HandleErrorServer } from "../Utils/CachError";
import mongoose from "mongoose";

declare global {
   namespace Express {
      interface Request {
         task: ITask;
      }
   }
}

export async function IsTaskExit(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { taskID } = req.params;

      // Validar si el ID es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(taskID)) {
         return HandleErrorNotFound(res, "ID no valido");
      }

      const task = await Task.findById(taskID).populate({
         path: "createBy.user",
         select: "_id name email",
      });

      if (!task) {
         return HandleErrorNotFound(res, "Tarea no existe");
      }

      req.task = task;

      next();
   } catch (error) {
      return HandleErrorServer(res, error.message);
   }
}

export async function IsTaskBelongProject(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      if (req.task.project.toString() !== req.project.id) {
         return HandleErrorNotFound(res, "La tarea no pertenece al proyecto");
      }

      next();
   } catch (error) {
      return HandleErrorServer(res, error.message);
   }
}
