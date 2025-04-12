import { getTaskByID } from "@/Services/TaskServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UpdateTaskModal from "./UpdateTaskModal";

export default function UpdateTaskData() {
   const paramsURL = useParams();
   const queryParms = new URLSearchParams(location.search);
   const taskID = queryParms.get("editTask")!;
   const projectID = paramsURL.projectID!;

   const { data, isLoading } = useQuery({
      queryKey: ["task", taskID],
      queryFn: () => getTaskByID({ projectID, taskID }),
      retry: false,
      enabled: !!taskID,
   });

   if (isLoading) {
      return "Cargando...";
   }

   if (data) {
      return <UpdateTaskModal task={data} projectID={projectID} />;
   }
}
