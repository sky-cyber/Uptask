import { Request, Response } from "express";
import { HandleErrorConflict, HandleErrorServer } from "../Utils/CachError";

import Project from "../Model/Projects";

export class ProjectsController {
   static createProject = async (req: Request, res: Response) => {
      const project = new Project(req.body);
      project.manager = req.user.id;
      try {
         await project.save();
         res.send("Proyecto creado");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static getAllProjects = async (req: Request, res: Response) => {
      try {
         const projects = await Project.find({
            $or: [
               {
                  manager: {
                     $in: req.user.id,
                  },
               },
               {
                  teams: {
                     $in: req.user.id,
                  },
               },
            ],
         });
         res.send(projects);
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static getProjectById = async (req: Request, res: Response) => {
      try {
         res.json(req.project);
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static updateProject = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         req.project.projectName = req.body.projectName;
         req.project.clientName = req.body.clientName;
         req.project.description = req.body.description;

         await req.project.save();
         res.send("Proyecto actualizado");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static deleteProject = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         await req.project.deleteOne();
         res.send("Proyecto eliminado");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };
}
