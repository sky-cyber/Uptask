import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../Middleware/Validation";
import { AuthController } from "../Controller/AuthController";
import { Authenticate } from "../Middleware/Auth";

const router = Router();

router.post(
   "/create-user",
   body("name").notEmpty().withMessage("El nombre no puede ir vacío"),
   body("email")
      .notEmpty()
      .withMessage("El email no puede ir vacío")
      .isEmail()
      .withMessage("Email no valido"),
   body("password")
      .notEmpty()
      .withMessage("La contraseña no puede ir vacía")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe contener minimo 8 caracteres"),
   body("confirm_password").custom((value, { req }) => {
      if (value !== req.body.password) {
         throw new Error("Las contraseñas no coinciden");
      }
      return true;
   }),
   handleInputErrors,
   AuthController.CreateUser
);

router.post(
   "/confirm-account",
   body("token").notEmpty().withMessage("Debe ingresar token"),
   handleInputErrors,
   AuthController.confirmAccount
);

router.post(
   "/login",
   body("email")
      .notEmpty()
      .withMessage("El email no puede ir vacío")
      .isEmail()
      .withMessage("Email no valido"),
   body("password").notEmpty().withMessage("Debe ingresar una contraseña"),
   handleInputErrors,
   AuthController.login
);

router.post(
   "/new-token",
   body("email")
      .notEmpty()
      .withMessage("El email no puede ir vacío")
      .isEmail()
      .withMessage("Email no valido"),
   handleInputErrors,
   AuthController.sendNewToken
);

router.post(
   "/forgot-password",
   body("email")
      .notEmpty()
      .withMessage("El email no puede ir vacío")
      .isEmail()
      .withMessage("Email no valido"),
   handleInputErrors,
   AuthController.forgotPassword
);

router.post(
   "/request-code-password",
   body("token").notEmpty().withMessage("Debe ingresar token"),
   handleInputErrors,
   AuthController.RequestCodePassword
);

router.post(
   "/restore-new-password/:token",
   param("token").isNumeric().withMessage("Token no valido"),
   body("password")
      .notEmpty()
      .withMessage("La contraseña no puede ir vacía")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe contener minimo 8 caracteres"),
   body("confirm_password").custom((value, { req }) => {
      if (value !== req.body.password) {
         throw new Error("Las contraseñas no coinciden");
      }
      return true;
   }),
   handleInputErrors,
   AuthController.restoreNewPassword
);

router.get("/get-user", Authenticate, AuthController.getUser);

export default router;
