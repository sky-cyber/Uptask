import type { Response } from "express";

export const HandleErrorNotFound = (res: Response, message: string) => {
   return res.status(400).json({ error: message });
};

export const HandleErrorConflict = (res: Response, message: string) => {
   return res.status(409).json({ error: message });
};

export const HandleErrorServer = (res: Response, message: string) => {
   return res.status(500).json({ error: message });
};
