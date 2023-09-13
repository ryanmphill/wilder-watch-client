import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../Context"
import { useContext } from "react"

export const Authorized = () => {
  const { token } = useContext(AuthContext)
  if (token) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}