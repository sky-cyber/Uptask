import { configMail } from "../../Config/email";

type IMail = {
   email: string;
   name: string;
   token: string;
};

export class Plantillas {
   static sendConfirmAccount = async (user: IMail) => {
      await configMail.sendMail({
         from: "UpTask <admin@uptask.com>",
         to: user.email,
         subject: "UpTask - Confirma tu cuenta",
         text: "UpTask - Confirma tu cuenta",
         html: `<p>Hola: ${user.name} has creado tu cuenta en UpTask, ya casi está todo listo, solo debes confirmar tu cuenta</p>
            
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.BASE_URL_FRONTEND}/auth/confirm-account">Confirma tu cuenta</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `,
      });
   };

   static restarPassowd = async (user: IMail) => {
      await configMail.sendMail({
         from: "UpTask <admin@uptask.com>",
         to: user.email,
         subject: "UpTask - Restablecer contraseñas",
         text: "UpTask - Te ha enviado las siguientes instruciones",
         html: `<p>Hola: ${user.name}, Has solicitado un cambio de claves, Se te ha dado un nuevo token de validación, Debes ingresarlo en el siguiente enlace , si el token es valido se desplegará un formulario donde puedes cambiar tus claves</p>
            
            <p>Restablece tus contraseñas aquí:</p>
            <a href="${process.env.BASE_URL_FRONTEND}/auth/restore-password">Restablecer contraseñas</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `,
      });
   };
}
