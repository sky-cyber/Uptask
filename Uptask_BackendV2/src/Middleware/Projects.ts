import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../Model/Projects";
import { HandleErrorConflict, HandleErrorNotFound } from "../Utils/CachError";
import mongoose from "mongoose";

declare global {
   namespace Express {
      interface Request {
         project: IProject;
      }
   }
}

export async function IsProjectExit(
   req: Request,
   res: Response,
   next: NextFunction
) {
   let { projectID } = req.params;

   // Validar si el ID es un ObjectId válido
   if (!mongoose.Types.ObjectId.isValid(projectID)) {
      return HandleErrorNotFound(res, "ID no valido");
   }

   const project = await Project.findById(projectID).populate("tasks");

   if (!project) {
      return HandleErrorNotFound(res, "Proyecto no encontrado");
   }

   req.project = project;
   next();
}

export async function IsManager(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const IsColaborador = req.project.teams.some(
      (x) => x._id.toString() === req.user.id.toString()
   );

   if (
      req.project.manager.toString() !== req.user.id.toString() &&
      !IsColaborador
   ) {
      return HandleErrorConflict(res, "Acción valida solo para el manager");
   }
   next();
}
