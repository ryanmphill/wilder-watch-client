import { Outlet, ScrollRestoration } from "react-router-dom"
import { AuthProvider } from "../../context/AuthContext"

const ApplicationLayout = () => {
    return <>
        <AuthProvider>
            <Outlet />
        </AuthProvider>
        <ScrollRestoration />
    </>
}
export default ApplicationLayout