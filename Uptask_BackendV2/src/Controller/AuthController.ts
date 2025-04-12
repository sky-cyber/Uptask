import { Request, Response } from "express";
import {
   HandleErrorConflict,
   HandleErrorNotFound,
   HandleErrorServer,
} from "../Utils/CachError";
import User from "../Model/Auth";
import { checkPassword, generateToken, hashPassword } from "../Utils/Metodos";
import Token from "../Model/Token";
import { Plantillas } from "../emails/Auth/Plantillas";
import { GenerateJWT } from "../Utils/jwt";

export class AuthController {
   static CreateUser = async (req: Request, res: Response) => {
      try {
         const { password, email } = req.body;

         // Validamos que el usurio exista
         const isUserExits = await User.findOne({ email });
         if (isUserExits) {
            return HandleErrorConflict(res, "El usuario ya existe");
         }

         // Creamos el nuevo usuario
         const user = new User(req.body);

         // encryptamos las contraseñas
         user.password = await hashPassword(password);

         // Generamos el token
         const token = new Token();
         token.token = await generateToken();
         token.user = user.id;

         // Enviamos el correo
         await Plantillas.sendConfirmAccount({
            email: user.email,
            name: user.name,
            token: token.token,
         });

         // Guardamos al usuario
         await Promise.allSettled([user.save(), token.save()]);

         res.send("Cuenta creada, Revisa tu email para confirmarla");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static confirmAccount = async (req: Request, res: Response) => {
      try {
         const { token } = req.body;

         // Validar si token existe
         const isTokenExist = await Token.findOne({ token });
         if (!isTokenExist) {
            return HandleErrorConflict(res, "Token no valido");
         }

         // Cambiamos el estado de confirmación
         const user = await User.findById(isTokenExist.user);
         user.confirmed = true;

         await Promise.allSettled([user.save(), isTokenExist.deleteOne()]);

         res.send("Cuenta confirmada con exito");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static login = async (req: Request, res: Response) => {
      try {
         const { email, password } = req.body;

         // validar si usuario existe
         const user = await User.findOne({ email });
         if (!user) {
            return HandleErrorConflict(res, "El usuario no existe");
         }

         // verificar si las contraseñas coinciden
         const isCheckPassword = await checkPassword(password, user.password);

         if (!isCheckPassword) {
            return HandleErrorConflict(res, "La contraseña es invalida");
         }

         // validar si usuario está confirmado
         if (!user.confirmed) {
            // Verificamos si ya tiene un token generado
            const isTokenExits = await Token.find({ user: user.id });
            if (isTokenExits.length > 0) {
               for (const item of isTokenExits) {
                  await item.deleteOne();
               }
            }
            // Generamos el token
            const token = new Token();
            token.token = await generateToken();
            token.user = user.id;
            await token.save();

            // Enviamos el correo
            await Plantillas.sendConfirmAccount({
               email: user.email,
               name: user.name,
               token: token.token,
            });

            return HandleErrorConflict(
               res,
               "Tu cuenta no está confirmada, Te hemos enviado un email para que confirmes tu cuenta"
            );
         }

         const JWT = GenerateJWT({ Id: user.id });

         res.json(JWT);
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static sendNewToken = async (req: Request, res: Response) => {
      try {
         const { email } = req.body;

         const user = await User.findOne({ email });
         if (!user) {
            return HandleErrorNotFound(res, "Usuario no existe");
         }

         if (user.confirmed) {
            return HandleErrorConflict(
               res,
               "Usuario ya tiene su cuenta confirmada"
            );
         }

         // Generamos el token
         const token = new Token();
         token.token = await generateToken();
         token.user = user.id;
         await token.save();

         // Enviamos el correo
         await Plantillas.sendConfirmAccount({
            email: user.email,
            name: user.name,
            token: token.token,
         });

         res.send(
            "Se ha enviado un nuevo Token para que pueda confirmar su cuenta"
         );
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static forgotPassword = async (req: Request, res: Response) => {
      try {
         const { email } = req.body;
         const user = await User.findOne({ email });
         if (!user) {
            return HandleErrorNotFound(res, "Usuario no existe");
         }

         const isTokenExits = await Token.find({ user: user.id });
         if (isTokenExits.length > 0) {
            for (const item of isTokenExits) {
               await item.deleteOne();
            }
         }

         // Generamos el token
         const token = new Token();
         token.token = await generateToken();
         token.user = user.id;
         await token.save();

         // Enviamos el correo
         await Plantillas.restarPassowd({
            email: user.email,
            name: user.name,
            token: token.token,
         });

         res.send(
            "Se ha enviado un nuevo Token coninstruciones para que pueda restablecer sus claves"
         );
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static RequestCodePassword = async (req: Request, res: Response) => {
      try {
         const { token } = req.body;
         const isToken = await Token.findOne({ token });

         if (!isToken) {
            return HandleErrorNotFound(res, "Token no valido");
         }
         res.send("Acceso permitido");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static restoreNewPassword = async (req: Request, res: Response) => {
      try {
         const { token } = req.params;
         const { password } = req.body;

         const tokenUser = await Token.findOne({ token });

         if (!tokenUser) {
            return HandleErrorNotFound(res, "Token no valido");
         }

         const user = await User.findById(tokenUser.user);

         // encryptamos las contraseñas
         user.password = await hashPassword(password);

         await Promise.allSettled([user.save(), tokenUser.deleteOne()]);

         res.send("Se han restablecido las contraseñas correctamente");
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };

   static getUser = async (req: Request, res: Response) => {
      try {
         return res.json(req.user);
      } catch (error) {
         return HandleErrorServer(res, error.message);
      }
   };
}
