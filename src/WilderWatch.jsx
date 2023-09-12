import { useState } from "react";
import ApplicationRoutes from "./routes/ApplicationRoutes.jsx";

//   const router = createBrowserRouter(
//     createRoutesFromElements(
//     <Route
//       element={<App />}
//       path="/"
//     />
//   ));



const WilderWatch = () => {
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [isWilderAdmin, setIsAdminState] = useState(localStorage.getItem('wilder_admin'))

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }

    const setIsWilderAdmin = (isStaff) => {
        localStorage.setItem('wilder_admin', isStaff)
        setIsAdminState(isStaff)
    }
    return <>
        <ApplicationRoutes 
        setToken={setToken} 
        setAdmin={setIsWilderAdmin}
        token={token}
        isAdmin={isWilderAdmin} />
    </>
}

export default WilderWatch