import jwt from "jsonwebtoken";
import Types from "mongoose";

type userPayload = {
   Id: Types.ObjectId;
};

export const GenerateJWT = (payload: userPayload) => {
   const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
   });

   return token;
};
