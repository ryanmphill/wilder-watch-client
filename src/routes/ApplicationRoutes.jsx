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
import EditStudyForm from "../components/studies/EditStudyForm";
import AddObservation from "../components/studies/AddObservation";
import ApplicationLayout from "../components/layouts/ApplicationLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ApplicationLayout />} path="/">
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route element={<NavBar />} path="/">
                    <Route
                        index element={<Home />}
                    />
                    <Route
                        element={<StudyDetails />}
                        path="/study/:studyId"
                    />
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