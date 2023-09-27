import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { Home } from "../components/home/Home";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import CreateStudyForm from "../components/studies/CreateStudyForm";
import { Authorized } from "../components/auth/Authorized";
import StudyDetails from "../components/studies/studyDetails/StudyDetails";
import EditStudyForm from "../components/studies/EditStudyForm";
import AddObservation from "../components/studies/observationForm/AddObservation";
import ApplicationLayout from "../components/layouts/ApplicationLayout";
import Profile from "../components/profile/Profile";
import ProfileActivity from "../components/profile/ProfileActivity";
import ProfileParticipated from "../components/profile/ProfileParticipated";
import ProfileAuthored from "../components/profile/ProfileAuthored";
import { studyLoader } from "../managers/StudyManager";
import { HandleException } from "../components/errorHandlers/HandleException";
import { profileLoader } from "../managers/UserManager";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ApplicationLayout />} 
                path="/"
                errorElement={<HandleException />}
            >
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route element={<NavBar />} path="/">
                    <Route
                        index element={<Home />}
                    />
                    <Route
                        element={<StudyDetails />}
                        path="/study/:studyId"
                        loader={studyLoader}
                        errorElement={<HandleException />}
                    />
                    <Route
                        element={<Profile />}
                        path="/profile/:userId"
                        id={"profileRoot"}
                        loader={profileLoader}
                        errorElement={<HandleException />}
                    >
                        <Route index element={<ProfileActivity />} />
                        <Route element={<ProfileParticipated />} path="participated" />
                        <Route element={<ProfileAuthored />} path="authored" />
                    </Route>
                    <Route element={<Authorized />}>
                        <Route element={<CreateStudyForm />} path="/study/new" />
                        <Route element={<EditStudyForm />} path="/study/edit/:studyId" />
                        <Route element={<AddObservation />} path="/study/:studyId/add_observation" />
                    </Route>
                </Route>
            </Route>
        </>
    ));

const ApplicationRoutes = () => {

    return <>
        <RouterProvider router={router} />
    </>
}

export default ApplicationRoutes