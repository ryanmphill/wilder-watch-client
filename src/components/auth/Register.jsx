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
  const [showFormFilledMsg, setShowFormFilledMsg] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    setShowDialog(false)
    setShowFormFilledMsg(false)

    const fields = [firstName, lastName, email, username, password]
    const formFilled = fields.every(field => field.current.value.length > 0)

    if (password.current.value === verifyPassword.current.value && formFilled === true) {
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
      if (password.current.value !== verifyPassword.current.value) {
        setShowDialog(true)
      }
      if (!formFilled) {
        setShowFormFilledMsg(true)
      }
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
          <label className="authForm__label" htmlFor="register__firsName">First Name</label>
            <input className="authForm__control" id="register__firsName" type="text" ref={firstName} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label" htmlFor="register__lastName">Last Name</label>
            <input className="authForm__control" id="register__lastName" type="text" ref={lastName} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label" htmlFor="register__username">Username</label>
            <input className="authForm__control" id="register__username" type="text" ref={username} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label" htmlFor="register__email">Email</label>
            <input className="authForm__control" id="register__email" type="email" ref={email} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label" htmlFor="register__password">Password</label>
          <div className="authForm__field-body">
            <div className="authForm__field">
              <p>
                <input className="authForm__control" id="register__password" type="password" placeholder="Password" ref={password} />
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
          <div className="error-message">
            ** Password fields must be matching **
          </div>
        }
        {
          showFormFilledMsg &&
          <div className="error-message">
            ** Please ensure all fields are filled in **
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