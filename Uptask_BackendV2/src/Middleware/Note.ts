import type { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { HandleErrorNotFound } from "../Utils/CachError";
import Note, { INote } from "../Model/Notes";

declare global {
   namespace Express {
      interface Request {
         note: INote;
      }
   }
}

export const IsNoteExist = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { noteID } = req.params;

   // Validar si el ID es un ObjectId válido
   if (!mongoose.Types.ObjectId.isValid(noteID)) {
      return HandleErrorNotFound(res, "ID no valido");
   }

   const note = await Note.findById(noteID);

   if (!note) {
      return HandleErrorNotFound(res, "La nota no existe");
   }

   req.note = note;

   next();
};
