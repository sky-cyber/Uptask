import { Request, Response, NextFunction } from "express";
import { HandleErrorConflict, HandleErrorServer } from "../Utils/CachError";
import jwt from "jsonwebtoken";
import User, { IUser } from "../Model/Auth";

declare global {
   namespace Express {
      interface Request {
         user?: IUser;
      }
   }
}

export const Authenticate = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const bearer = req.headers.authorization;
   if (!bearer) {
      return HandleErrorServer(res, "No Autorizado");
   }

   const token = bearer.split(" ")[1];

   try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (typeof decoded === "object" && decoded.Id) {
         const user = await User.findById(decoded.Id).select("_id name email");
         if (user) {
            req.user = user;
            next();
         } else {
            return HandleErrorConflict(res, "Token no valido");
         }
      }
   } catch (error) {
      return HandleErrorServer(res, "Token no valido");
   }
};
