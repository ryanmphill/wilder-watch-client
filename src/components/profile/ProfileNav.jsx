import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./profileNav.css"

export const ProfileNav = ({ profileId }) => {
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState('')
    const navigate = useNavigate()
    useEffect(
        () => {
            if (location.pathname.includes('/participated')) {
                setCurrentPath('participated')
            } else if (location.pathname.includes('/authored')) {
                setCurrentPath('authored')
            } else {
                setCurrentPath('activity')
            }
        },
        [location]
    )
    return <div className="profileNav fadeIn">
        <div className="profileNav__LinkContainer">
        <button className={`profileNavLink profileNav--hoverEffect underline-effect ${currentPath === "activity" ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault()
                navigate("")
            }}>
            Activity
        </button>
        </div>

        <div className="profileNav__LinkContainer">
        <button className={`profileNavLink profileNav--hoverEffect underline-effect ${currentPath === "participated" ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault()
                navigate(`participated`)
            }}>
            Studies Participated In
        </button>
        </div>

        <div className="profileNav__LinkContainer">
        <button className={`profileNavLink profileNav--hoverEffect underline-effect ${currentPath === "authored" ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault()
                navigate(`authored`)
            }}>
            Studies Authored
        </button>
        </div>
    </div>
}