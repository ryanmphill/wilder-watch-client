import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import { AuthContext } from "../../context/AuthContext"
import wilderLogo from "../../assets/g-bird2.svg"
import "./auth.css"

export const Login = () => {
  const {setToken, setAdmin} = useContext(AuthContext)
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    try {
      const res = await loginUser(user)
      if ("valid" in res && res.valid) {
        setToken(res.token)
        setAdmin(res.isStaff)
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    } catch (error) {
      console.error(error)
      window.alert("An error occured while logging in")
    }
  }
  
  return (
    <section className="authFormContainer fadeIn">
      <form className="authForm loginForm" onSubmit={handleLogin}>
      <div className="authForm__headerLogoContainer">
          <div className="authForm__logoContainer">
            <img src={wilderLogo} alt="logo" className="authForm__logo"></img>
          </div>
          <h2 className="authFormHeader">Welcome Back To WilderWatch</h2>
          <div className="flexPlaceholder"> </div>
        </div>
        <h3 className="authFormSubHeader">Please Sign In</h3>

        <div className="authForm__field">
          <label className="authForm__label" htmlFor="login__username">Username</label>
            <input className="authForm__control" id="login__username" type="text" ref={username} />
        </div>

        <div className="authForm__field">
          <label className="authForm__label" htmlFor="login__password">Password</label>
            <input className="authForm__control" id="login__password" type="password" ref={password} />
        </div>

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
        {
          isUnsuccessful ? <p className="error-message">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}