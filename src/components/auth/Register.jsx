import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import { AuthContext } from "../../context/AuthContext"
import "./auth.css"
import wilderLogo from "../../assets/g-bird2.svg"

export const Register = () => {
  const {setToken, setAdmin} = useContext(AuthContext)

  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const [showPasswordDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value
      }

      try {
        const res = await registerUser(newUser)
        if ("valid" in res && res.valid) {
          setToken(res.token)
          setAdmin(res.isStaff)
          navigate("/")
        }
      } catch (error) {
        console.error(error)
      }
        
    } else {
      setShowDialog(true)
    }
  }

  return (
    <section className="authFormContainer fadeIn">
      <form className="authForm" onSubmit={handleRegister}>
        <div className="authForm__headerLogoContainer">
          <div className="authForm__logoContainer">
            <img src={wilderLogo} alt="logo" className="authForm__logo"></img>
          </div>
          <h1 className="authFormHeader">Welcome To WilderWatch</h1>
          <div className="flexPlaceholder"> </div>
        </div>
        <h3 className="authFormSubHeader">Create an account</h3>
        <div className="authForm__field">
          <label className="authForm__label">First Name</label>
            <input className="authForm__control" type="text" ref={firstName} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label">Last Name</label>
            <input className="authForm__control" type="text" ref={lastName} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label">Username</label>
            <input className="authForm__control" type="text" ref={username} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label">Email</label>
            <input className="authForm__control" type="email" ref={email} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label">Password</label>
          <div className="authForm__field-body">
            <div className="authForm__field">
              <p>
                <input className="authForm__control" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="authForm__field">
              <p>
                <input className="authForm__control" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>

        {
          showPasswordDialog &&
          <div className="warning__msg">
            Password authForm__fields must be matching
          </div>
        }

        <div className="authForm__btnGroup">
            <button className="btn__large" type="submit">Submit</button>
          <div>
            <button className="btn__cancel__large"
              onClick={(e) => {
                e.preventDefault()
                navigate("/")
              }}
            >Cancel</button>
          </div>
        </div>

      </form>
    </section>
  )
}