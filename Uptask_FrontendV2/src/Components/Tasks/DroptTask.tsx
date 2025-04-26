import { useDroppable } from "@dnd-kit/core";

type DroptTaskProps = {
   status: string;
};

export default function DroptTask({ status }: DroptTaskProps) {
   const { isOver, setNodeRef } = useDroppable({
      id: status,
   });

   return (
      <div
         ref={setNodeRef}
         className={`text-xs font-semibold uppercase p-2 border border-dashed ${
            isOver ? "border-amber-500" : "border-slate-500"
         } mt-5 grid place-content-center text-slate-500`}
      >
         Soltar tarea aquí
      </div>
   );
}
