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



const ApplicationRoutes = ({token, setToken, isAdmin, setAdmin}) => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<Login setToken={setToken} setAdmin={setAdmin} />} path="/login" />
                <Route element={<Register setToken={setToken} setAdmin={setAdmin} />} path="/register" />
                <Route element={<NavBar />} path="/">
                    <Route
                        index element={<Home />}
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