import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import { AuthContext } from "../../Context"

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
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleRegister}>
        <h1 className="title">Welcome To WilderWatch</h1>
        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>

        {
          showPasswordDialog &&
          <div className="has-text-danger">
            Password fields must be matching
          </div>
        }

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/" className="button is-link is-light">Cancel</Link>
          </div>
        </div>

      </form>
    </section>
  )
}