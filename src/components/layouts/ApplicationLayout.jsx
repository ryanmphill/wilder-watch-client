import { Outlet } from "react-router-dom"
import { AuthProvider } from "../../context/AuthContext"

const ApplicationLayout = () => {
    return <>
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    </>
}
export default ApplicationLayout