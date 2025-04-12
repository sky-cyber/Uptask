import mongoose from "mongoose";
import colors from "colors";

import { exit } from "node:process";

export const connectDB = async () => {
   try {
      const server = await mongoose.connect(process.env.DATABASE_URL);
      const url = `${server.connection.host}:${server.connection.port}`;
      console.log(colors.magenta.bold(`MongoDB Conectado en: ${url}`));
   } catch (error) {
      console.log(error.message);
      exit(1);
   }
};
