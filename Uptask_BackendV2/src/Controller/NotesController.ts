import { Request, Response } from "express";
import { HandleErrorServer } from "../Utils/CachError";
import Note from "../Model/Notes";
import Task from "../Model/Tasks";
import { link } from "node:fs";

export class NotesController {
   static createNoteForTask = async (req: Request, res: Response) => {
      try {
         const { content } = req.body;
         const note = new Note({
            content,
            user: req.user.id,
            task: req.task.id,
         });

         req.task.notes.push(note.id);

         await Promise.allSettled([note.save(), req.task.save()]);
         res.send(`Nota creada por ${req.user.name}`);
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller NotesController/createNoteForTask"
         );
      }
   };

   static getNotesFromTask = async (req: Request, res: Response) => {
      try {
         const task = await Task.findById(req.task.id).populate({
            path: "notes",
            populate: { path: "user", select: "_id name email urlImagen" },
         });

         res.json(task.notes);
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller NotesController/getNotesFromTask"
         );
      }
   };

   static getNoteIDFromTask = async (req: Request, res: Response) => {
      try {
         res.json(req.note);
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller NotesController/getNoteIDFromTask"
         );
      }
   };

   static deleteNoteFromTask = async (req: Request, res: Response) => {
      try {
         req.task.notes = req.task.notes.filter(
            (item) => item._id != req.note.id
         );

         await Promise.allSettled([req.note.deleteOne(), req.task.save()]);
         res.send("Eliminaste la nota");
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller NotesController/getNoteIDFromTask"
         );
      }
   };

   static updateNoteFromTask = async (req: Request, res: Response) => {
      try {
         const { content } = req.body;

         req.note.content = content;
         await req.note.save();

         res.send("La nota fue actualizada correctamente");
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller NotesController/updateNoteFromTask"
         );
      }
   };

   static addLikeMemberFromNote = async (req: Request, res: Response) => {
      try {
         const userFound = req.note.likes.some(
            (user) => user.toString() === req.user.id.toString()
         );

         if (userFound) {
            req.note.likes = req.note.likes.filter(
               (user) => user.toString() !== req.user.id.toString()
            );
         } else {
            req.note.likes.push(req.user.id);
         }
         await req.note.save();
         res.send("Agregado...");
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller NotesController/addLikeMemberFromNote"
         );
      }
   };

   static getListLikeMember = async (req: Request, res: Response) => {
      try {
         const note = await Note.findById(req.note.id).populate({
            path: "likes",
            select: "_id name email urlImagen",
         });

         return res.json(note.likes);
      } catch (error) {
         return HandleErrorServer(
            res,
            "Error en el controller NotesController/getListLikeMember"
         );
      }
   };
}
