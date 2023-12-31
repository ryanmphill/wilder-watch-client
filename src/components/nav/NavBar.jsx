import { Outlet, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { DropdownMenu } from "./DropdownMenu"
import wilderLogo from "../../assets/g-bird2.svg"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const NavBar = () => {
    const { fetchCurrentUserId } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div>
        <ul className="navbar">
            <li id="logoContainer">
                <img className="navbar__logo" src={wilderLogo} alt="Logo" onClick={() => navigate("/")}></img>
                <h2 id="wilderTitle" onClick={() => navigate("/")}>WilderWatch</h2>
            </li>
            <li className="navbar__item navbar__Title">
                
            </li>
            <li className="navbar__item navbar__menu">
                <DropdownMenu refreshUser={fetchCurrentUserId} />
            </li>
        </ul>
        <div id="main-content">
            <Outlet />
        </div>
        </div>
    )
}