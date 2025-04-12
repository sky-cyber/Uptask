import { z } from "zod";
import { authShemma } from "./User";

export const TeamShemma = z.object({
   manager: authShemma,
   teams: z.array(authShemma),
});

export type Team = z.infer<typeof authShemma>;
export type ListTeam = z.infer<typeof TeamShemma>;
