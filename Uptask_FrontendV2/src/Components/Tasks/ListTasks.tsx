import {
   DndContext,
   DragEndEvent,
   MouseSensor,
   TouchSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core";
import { Task, TaskCardData, TaskCartList, TaskStatus } from "@/Types/Task";
import {
   initialStatusGroup,
   statusStyle,
   statusStyleBG,
   statusTraslations,
} from "@/helpers/TransisionStatus";
import TaskCard from "@/Components/Tasks/TaskCard";
import DroptTask from "./DroptTask";
import { H_UpdateStatusTask } from "@/Hooks/Tasks";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type ListTasksProp = {
   tasks: TaskCardData[];
   CanUseThisFunction: boolean;
};

export default function ListTasks({
   tasks,
   CanUseThisFunction,
}: ListTasksProp) {
   const params = useParams();
   const projectID = params.projectID!;

   const queryClient = useQueryClient();

   const groupTasks = tasks.reduce((acc, task) => {
      let currentGroupTask = acc[task.status] ? [...acc[task.status]] : [];
      currentGroupTask = [...currentGroupTask, task];
      return { ...acc, [task.status]: currentGroupTask };
   }, initialStatusGroup);

   const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: {
         distance: 10,
      },
   });

   const touchSensor = useSensor(TouchSensor, {
      activationConstraint: {
         delay: 250,
         tolerance: 5,
      },
   });

   const sensors = useSensors(mouseSensor, touchSensor);
   const { mutate } = H_UpdateStatusTask({ projectID, taskID: "" });

   const handleDragEnd = (e: DragEndEvent) => {
      const { over, active } = e;
      if (over && active.id) {
         const data = {
            projectID,
            taskID: active.id.toString(),
            status: over.id as TaskStatus,
         };
         mutate(data);

         queryClient.setQueryData(
            ["ProjectDetails", projectID],
            (prevData: TaskCartList) => {
               const updateTasks = prevData.tasks.map((task: Task) => {
                  if (task._id === data.taskID) {
                     return {
                        ...task,
                        status: data.status,
                     };
                  }
                  return task;
               });

               return {
                  ...prevData,
                  tasks: updateTasks,
               };
            }
         );
      }
   };

   return (
      <div className="p-0">
         <h2 className="text-5xl font-black my-10">Tareas</h2>

         <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 ">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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

                     <DroptTask status={status} />

                     <ul className="mt-5 space-y-1 bg-discord-background_Second p-1 rounded-lg ring-1 ring-gray-500/20 border-b border-black/55">
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
            </DndContext>
         </div>
      </div>
   );
}
