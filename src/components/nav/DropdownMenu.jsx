import { useContext, useEffect, useState } from 'react';
import './DropdownMenu.css' // Import CSS styles for the dropdown menu
import { Link, useNavigate } from 'react-router-dom';
import burgerIcon from "../../assets/burgericon.svg"
import { AuthContext } from '../../context/AuthContext';

export const DropdownMenu = ({ refreshUser }) => {
    const [isOpen, setIsOpen] = useState(false) // State to track if the dropdown is open or closed
    const { currentUserId } = useContext(AuthContext)

    useEffect(
      () => {
        if (isOpen) {
          refreshUser()
        }
      },
      [refreshUser, isOpen]
    )
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen) // Toggle the state to open or close the dropdown
    }

    // Function to untoggle the dropdown when the user clicks anywhere else 
    const handleOutsideClick = (event) => {
        const dropdownContainer = document.querySelector('.dropdown')
        if (!dropdownContainer.contains(event.target)) {
            setIsOpen(false)
        }
    }
    /* Observe when dropdown state changes between open and closed, then 
      add and remove event listener to run handleOutsideClick callback function*/
    useEffect(
        () => {
            if (isOpen) {
                /* When the dropdown is open, add an event listener that
                   closes the dropdown when the user clicks anywhere else */
                document.addEventListener('click', handleOutsideClick)
            } else {
                // When dropdown is closed, remove event listener
                document.removeEventListener('click', handleOutsideClick)
            } 
            return () => {
                /* Remove the event listener everytime the component is rendered
                   with a cleanup function */
                document.removeEventListener('click', handleOutsideClick)
            } 
        },
        [isOpen]
    )

    //Import useNavigate and assign it to a variable
    const navigate = useNavigate()

    return (
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          <img src={burgerIcon} alt="hamburger menu" id="hamburger"></img>
        </button>
        {isOpen && <>
            <section className="dropdown-content" onClick={toggleDropdown}>
              <Link className="dropdown--link" to="/">Home</Link>
              { // Links for logged in users
                localStorage.getItem("auth_token")
                  ? <div>
                    <Link className="dropdown--link" to={`/profile/${currentUserId}`}>Profile</Link>
                    <Link className="dropdown--link" to="/study/new">+ New Study</Link>
                    <Link className="dropdown--link" to="" onClick={() => {
                      localStorage.removeItem("auth_token")
                      localStorage.removeItem("wilder_admin")
                      refreshUser()
                      navigate("/", { replace: true })
                    }}>Logout</Link>
                  </div>
                  : <>
                    <Link className="dropdown--link" to="login">Log In</Link>
                    <Link className="dropdown--link" to="register">Register</Link>
                  </>
              }
            </section>
        </> 
        }
      </div>
    )
  }
  