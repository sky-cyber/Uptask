import { Router } from "express";
import { ProjectsController } from "../Controller/ProjectsController";

import { body, param } from "express-validator";
import { handleInputErrors } from "../Middleware/Validation";
import { IsManager, IsProjectExit } from "../Middleware/Projects";
import { TasksController } from "../Controller/TasksController";
import { IsTaskBelongProject, IsTaskExit } from "../Middleware/Tasks";
import { Authenticate } from "../Middleware/Auth";
import { TeamController } from "../Controller/TeamController";
import { NotesController } from "../Controller/NotesController";
import { IsNoteExist } from "../Middleware/Note";

const router = Router();

router.use(Authenticate);

router.param("projectID", IsProjectExit);
router.param("projectID", IsManager);
router.param("taskID", IsTaskExit);
router.param("taskID", IsTaskBelongProject);
router.param("noteID", IsNoteExist);

// TODO:************************* PROJECTS ************************* //

router.post(
   "/",
   body("projectName")
      .notEmpty()
      .withMessage("El nombre del proyecto es obligatorio"),
   body("clientName")
      .notEmpty()
      .withMessage("El nombre del cliente es obligatorio"),
   body("description").notEmpty().withMessage("La descripció es obligatoria"),
   handleInputErrors,
   ProjectsController.createProject
);

router.get("/", ProjectsController.getAllProjects);

router.get(
   "/:projectID",
   param("projectID").isMongoId().withMessage("ID no valido"),
   handleInputErrors,
   ProjectsController.getProjectById
);

router.put(
   "/:projectID",
   param("projectID").isMongoId().withMessage("ID no valido"),
   body("projectName")
      .notEmpty()
      .withMessage("El nombre del proyecto es obligatorio"),
   body("clientName")
      .notEmpty()
      .withMessage("El nombre del cliente es obligatorio"),
   body("description").notEmpty().withMessage("La descripció es obligatoria"),
   handleInputErrors,
   ProjectsController.updateProject
);

router.delete(
   "/:projectID",
   param("projectID").isMongoId().withMessage("ID no valido"),
   handleInputErrors,
   ProjectsController.deleteProject
);

// TODO:************************* TASKS ************************* //

router.post(
   "/:projectID/tasks",
   param("projectID").isMongoId().withMessage("ID no valido"),
   body("name").notEmpty().withMessage("El nombre de la tarea es obligatoria"),
   body("description").notEmpty().withMessage("La descripció es obligatoria"),
   handleInputErrors,
   TasksController.createStask
);

router.get("/:projectID/tasks", TasksController.getAllTaskByProject);

router.get("/:projectID/tasks/:taskID", TasksController.getTaskById);

router.get(
   "/:projectID/tasks/:taskID/CantRegister",
   TasksController.getCantRegister
);

router.put(
   "/:projectID/tasks/:taskID",
   param("taskID").isMongoId().withMessage("ID no valido"),
   body("name").notEmpty().withMessage("El nombre de la tarea es obligatoria"),
   body("description").notEmpty().withMessage("La descripció es obligatoria"),
   handleInputErrors,
   TasksController.updateTask
);

router.delete(
   "/:projectID/tasks/:taskID",
   param("taskID").isMongoId().withMessage("ID no valido"),
   TasksController.deleteTask
);

router.patch(
   "/:projectID/tasks/:taskID/status",
   param("taskID").isMongoId().withMessage("ID no valido"),
   body("status")
      .notEmpty()
      .withMessage("El nombre de la tarea es obligatoria"),
   handleInputErrors,
   TasksController.updateStatusTask
);

// TODO:************************* TEAMS ************************* //

router.get("/:projectID/team", TeamController.getAllMemberToProject);

router.post(
   "/:projectID/team/find",
   body("email")
      .notEmpty()
      .withMessage("El campo no puede ir vacío")
      .isEmail()
      .withMessage("Email no valido"),
   handleInputErrors,
   TeamController.findMemberToProject
);

router.post(
   "/:projectID/team",
   body("userID").isMongoId().withMessage("ID no valido"),
   handleInputErrors,
   TeamController.saveMemberToProject
);

router.delete(
   "/:projectID/team/:userID",
   param("userID").isMongoId().withMessage("ID no valido"),
   handleInputErrors,
   TeamController.deleteMemeberToProject
);

// TODO:************************* Notes ************************* //

router.get(
   "/:projectID/tasks/:taskID/read-notes",
   NotesController.getNotesFromTask
);

router.get(
   "/:projectID/tasks/:taskID/get-note/:noteID",
   NotesController.getNoteIDFromTask
);

router.post(
   "/:projectID/tasks/:taskID/create-note",
   body("content").notEmpty().withMessage("La nota no puede ir vacía"),
   handleInputErrors,
   NotesController.createNoteForTask
);

router.delete(
   "/:projectID/tasks/:taskID/delete-note/:noteID",
   param("noteID").isMongoId().withMessage("ID no valido"),
   NotesController.deleteNoteFromTask
);

router.patch(
   "/update-note/:noteID",
   body("content").notEmpty().withMessage("La nota no puede ir vacía"),
   handleInputErrors,
   NotesController.updateNoteFromTask
);

router.post(
   "/:projectID/tasks/:taskID/note/:noteID/addLikeMember",
   NotesController.addLikeMemberFromNote
);

router.get(
   "/:projectID/tasks/:taskID/note/:noteID/getListLikesMember",
   NotesController.getListLikeMember
);

export default router;
