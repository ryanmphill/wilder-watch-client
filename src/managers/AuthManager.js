import { apiUrl } from "../utils/config/apiConfig"

export const loginUser = async (user) => {
    const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  })
  return await res.json()
  }
  
  export const registerUser = async (newUser) => {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    return await res.json()
  }

  export const getCurrentUser = async () => {
    const res = await fetch(`${apiUrl}/users/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      },
    })
    return await res.json()
}