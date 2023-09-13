import { Outlet } from "react-router-dom"
import { AuthProvider } from "../../Context"

const ApplicationLayout = () => {
    return <>
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    </>
}
export default ApplicationLayout