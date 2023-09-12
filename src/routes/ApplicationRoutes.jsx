import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import { NavBar } from "../components/nav/NavBar";
import { Home } from "../components/home/Home";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import CreateStudyForm from "../components/studies/CreateStudyForm";
import { Authorized } from "../components/auth/Authorized";
import StudyDetails from "../components/studies/StudyDetails";
import { getCurrentUser } from "../managers/AuthManager";
import { getAllStudies } from "../managers/StudyManager";
import { useState } from "react";



const ApplicationRoutes = ({token, setToken, isAdmin, setAdmin}) => {
    const [studies, setStudies] = useState([])
    const [currentUserId, setCurrentUserId] = useState(0)

    const fetchStudies = () => {
        getAllStudies().then(data => setStudies(data))
    }

    const fetchCurrentUserId = () => {
        if (localStorage.getItem("auth_token")) {
            getCurrentUser().then(data => setCurrentUserId(data.id))
        } else {
            setCurrentUserId(0)
        }
        
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<Login setToken={setToken} setAdmin={setAdmin} />} path="/login" />
                <Route element={<Register setToken={setToken} setAdmin={setAdmin} />} path="/register" />
                <Route element={<NavBar fetchCurrentUserId={fetchCurrentUserId} fetchStudies={fetchStudies} />} path="/">
                    <Route
                        index element={<Home 
                            fetchCurrentUserId={fetchCurrentUserId}
                            fetchStudies={fetchStudies}
                            studies={studies}
                            currentUserId={currentUserId} />}
                    />
                    <Route
                        element={<StudyDetails />}
                        path="/study/:studyId"
                    />
                    <Route element={<Authorized token={token}/>}>
                        <Route element={<CreateStudyForm />} path="/study/new" />
                    </Route>
                </Route>
            </>
        ));

    return <>
        <RouterProvider router={router} />
    </>
}

export default ApplicationRoutes