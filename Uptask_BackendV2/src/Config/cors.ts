import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
   origin: function (origin, callback) {
      const whiteList = [process.env.BASE_URL_FRONTEND];

      if (process.argv[2] === "--api") {
         whiteList.push(undefined);
      }

      if (whiteList.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error("Error de CORS"));
      }
   },
};
