import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/Layouts/AppLayout";
import DashBoardView from "@/Views/DashBoardView";
import CreateProject from "@/Views/Project/CreateProject";
import UpdateProject from "@/Views/Project/UpdateProject";
import ProjectDetails from "@/Views/Project/ProjectDetails";
import AuthLayout from "@/Layouts/AuthLayout";
import Login from "@/Views/Auth/Login";
import CreateUser from "@/Views/Auth/CreateUser";
import ConfirmAccount from "@/Views/Auth/ConfirmAccount";
import NewCodeToken from "./Views/Auth/NewCodeToken";
import ForgotPassword from "./Views/Auth/ForgotPassword";
import RestorePassword from "./Views/Auth/RestorePassword";
import TeamsProjectView from "./Views/Project/TeamsProjectView";
import ProfileLayaout from "./Layouts/ProfileLayaout";
import ProfileView from "./Views/Profile/ProfileView";
import ChangePassword from "./Views/Profile/ChangePassword";

const AppRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<AppLayout />}>
               <Route path="/" element={<DashBoardView />} index />
               <Route
                  path="/create/project"
                  element={<CreateProject />}
                  index
               />
               <Route
                  path="/projects/:projectID/edit"
                  element={<UpdateProject />}
                  index
               />
               <Route
                  path="/projects/:projectID"
                  element={<ProjectDetails />}
                  index
               />

               <Route
                  path="/projects/:projectID/teams"
                  element={<TeamsProjectView />}
               />

               <Route>
                  <Route element={<ProfileLayaout />}>
                     <Route path="/profile/view" element={<ProfileView />} />
                     <Route
                        path="/profile/change-password"
                        element={<ChangePassword />}
                     />
                  </Route>
               </Route>
            </Route>
            <Route>
               <Route element={<AuthLayout />}>
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/create-user" element={<CreateUser />} />
                  <Route
                     path="/auth/confirm-account"
                     element={<ConfirmAccount />}
                  />
                  <Route path="/auth/new-token" element={<NewCodeToken />} />
                  <Route
                     path="/auth/forgot-password"
                     element={<ForgotPassword />}
                  />
                  <Route
                     path="/auth/restore-password"
                     element={<RestorePassword />}
                  />
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

export default AppRouter;
