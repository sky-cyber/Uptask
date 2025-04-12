import { TaskCardData } from "@/Types/Task";

type groupTasks = {
   [key: string]: TaskCardData[];
};

export const initialStatusGroup: groupTasks = {
   pending: [],
   onHold: [],
   inProgress: [],
   underReview: [],
   completed: [],
};

export const statusStyle: { [key: string]: string } = {
   pending: "border-t-slate-700",
   onHold: "border-t-red-700",
   inProgress: "border-t-blue-700",
   underReview: "border-t-amber-500",
   completed: "border-t-emerald-700",
};

export const statusStyleBG: { [key: string]: string } = {
   pending: "bg-slate-200",
   onHold: "bg-red-200",
   inProgress: "bg-blue-200",
   underReview: "bg-amber-200",
   completed: "bg-emerald-200",
};

export const statusTraslations: { [key: string]: string } = {
   pending: "Pendiente",
   onHold: "En espera",
   inProgress: "En progreso",
   underReview: "Revisión",
   completed: "Completado",
};

export const statusColor: { [key: string]: string } = {
   pending: "text-slate-500",
   onHold: "text-red-500",
   inProgress: "text-blue-500",
   underReview: "text-amber-500",
   completed: "text-emerald-500",
};
