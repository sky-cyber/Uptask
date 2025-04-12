import { TaskCardData } from "@/Types/Task";
import {
   initialStatusGroup,
   statusStyle,
   statusStyleBG,
   statusTraslations,
} from "@/helpers/TransisionStatus";
import TaskCard from "@/Components/Tasks/TaskCard";

type ListTasksProp = {
   tasks: TaskCardData[];
   CanUseThisFunction: boolean;
};

export default function ListTasks({
   tasks,
   CanUseThisFunction,
}: ListTasksProp) {
   const groupTasks = tasks.reduce((acc, task) => {
      let currentGroupTask = acc[task.status] ? [...acc[task.status]] : [];
      currentGroupTask = [...currentGroupTask, task];
      return { ...acc, [task.status]: currentGroupTask };
   }, initialStatusGroup);

   return (
      <div className="p-0">
         <h2 className="text-5xl font-black my-10">Tareas</h2>

         <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 ">
            {Object.entries(groupTasks).map(([status, tasks]) => (
               <div
                  key={status}
                  className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5"
               >
                  <h3
                     className={`capitalize text-xl font-light border rounded-lg border-slate-300 ${statusStyleBG[status]} text-black p-3 border-t-8 ${statusStyle[status]}`}
                  >
                     {statusTraslations[status]}
                  </h3>
                  <ul className="mt-5 space-y-5 bg-discord-background_Second p-3 rounded-lg ring-1 ring-gray-500/20 border-b border-black/55">
                     {tasks.length === 0 ? (
                        <li className="text-gray-500 text-center pt-3">
                           No hay tareas asignadas
                        </li>
                     ) : (
                        tasks.map((task) => (
                           <TaskCard
                              key={task._id}
                              task={task}
                              CanUseThisFunction={CanUseThisFunction}
                           />
                        ))
                     )}
                  </ul>
               </div>
            ))}
         </div>
      </div>
   );
}
