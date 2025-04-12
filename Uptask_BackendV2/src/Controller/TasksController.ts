import { Request, Response } from "express";
import {
   HandleErrorConflict,
   HandleErrorNotFound,
   HandleErrorServer,
} from "../Utils/CachError";
import Task from "../Model/Tasks";

export class TasksController {
   static createStask = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         const task = new Task(req.body);
         task.project = req.project.id;
         req.project.tasks.push(task.id);
         await Promise.allSettled([task.save(), req.project.save()]);
         res.send("Tarea creada");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static getAllTaskByProject = async (req: Request, res: Response) => {
      try {
         const tasks = await Task.find({
            project: req.project.id,
         }).populate("project");

         res.json(tasks);
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static getTaskById = async (req: Request, res: Response) => {
      try {
         res.json(req.task);
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static updateTask = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         req.task.name = req.body.name;
         req.task.description = req.body.description;
         await req.task.save();
         res.send("Tarea actualizada");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static deleteTask = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         req.project.tasks = req.project.tasks.filter(
            (task) => task.toString() !== req.task.id.toString()
         );

         await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
         res.send("Tarea eliminada");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static updateStatusTask = async (req: Request, res: Response) => {
      try {
         const data = {
            user: req.user.id,
            status: req.body.status,
            updateAt: new Date(),
         };

         req.task.createBy.push(data);

         req.task.status = req.body.status;
         await req.task.save();
         res.send("Estado actualizada");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };
}
