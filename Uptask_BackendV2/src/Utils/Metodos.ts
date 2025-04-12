import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

export const generateToken = () => {
   return Math.floor(100000 + Math.random() * 90000).toString();
};

export const checkPassword = async (password: string, hashPassword: string) => {
   return await bcrypt.compare(password, hashPassword);
};
