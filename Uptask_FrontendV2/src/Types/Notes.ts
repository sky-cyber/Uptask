import { z } from "zod";
import { authShemma } from "./User";

export const NoteShemma = z.object({
   _id: z.string(),
   content: z.string(),
   user: authShemma,
   updatedAt: z.string(),
   likes: z.array(z.string()),
});

export const ListNoteShema = z.array(NoteShemma);
export const likeMemberShemma = z.array(authShemma);

export type Note = z.infer<typeof NoteShemma>;
export type NoteList = z.infer<typeof ListNoteShema>;
export type Content = Pick<Note, "content">;
export type LikesMember = Pick<Note, "likes">;
