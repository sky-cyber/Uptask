import { Request, Response } from "express";
import User from "../Model/Auth";
import {
   HandleErrorConflict,
   HandleErrorNotFound,
   HandleErrorServer,
} from "../Utils/CachError";
import Project from "../Model/Projects";

export class TeamController {
   static findMemberToProject = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         const { email } = req.body;

         const user = await User.findOne({ email }).select(
            "id name email confirmed"
         );

         if (!user) {
            return HandleErrorNotFound(
               res,
               `No se enontraron resultados con el email ${email}`
            );
         }

         if (req.user.id.toString() === user.id.toString()) {
            return HandleErrorConflict(
               res,
               "No puedes agregarte como colaborador si eres Manager"
            );
         }

         if (!user.confirmed) {
            return HandleErrorConflict(
               res,
               "Este usuario no ha confirmado su cuenta"
            );
         }

         res.json(user);
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller TeamController/findMemberToProject"
         );
      }
   };

   static saveMemberToProject = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         const { userID } = req.body;

         const user = await User.findById(userID).select("_id name");

         if (!user) {
            return HandleErrorNotFound(res, "Acción no valida");
         }

         const userExits = req.project.teams.some(
            (x) => x._id.toString() === user.id.toString()
         );

         if (userExits) {
            return HandleErrorConflict(
               res,
               "Usuario ya está agregado al equipo"
            );
         }

         req.project.teams.push(user.id);
         await req.project.save();

         res.send(`El usuario ${user.name} fue agregado de manera exitosa`);
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el TeamController/saveMemberToProject"
         );
      }
   };

   static getAllMemberToProject = async (req: Request, res: Response) => {
      try {
         const project = await Project.findById(req.project.id)
            .populate({
               path: "manager",
               select: "_id name email",
            })
            .populate({
               path: "teams",
               select: "_id name email",
            });

         res.json({ manager: project.manager, teams: project.teams });
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el TeamController/getAllMemberToProject"
         );
      }
   };

   static deleteMemeberToProject = async (req: Request, res: Response) => {
      try {
         if (req.project.manager.toString() !== req.user.id.toString()) {
            return HandleErrorConflict(res, "Acción no valida");
         }

         const { userID } = req.params;

         const user = await User.findById(userID);

         if (!user) {
            return HandleErrorNotFound(res, "El usuario no existe");
         }

         const userExits = req.project.teams.some(
            (x) => x._id.toString() === user.id.toString()
         );

         if (!userExits) {
            return HandleErrorNotFound(
               res,
               `${user.name} ya no es parte de esté equipo`
            );
         }

         req.project.teams = req.project.teams.filter(
            (x) => x._id.toString() !== user.id.toString()
         );

         await req.project.save();
         return res.send(`Usuario ${user.name} eliminado del equipo`);
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el TeamController/deleteMemeberToProject"
         );
      }
   };
}
