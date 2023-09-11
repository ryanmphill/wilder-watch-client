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
                </Route>
            </>
        ));

    return <>
        <RouterProvider router={router} />
    </>
}

export default ApplicationRoutes