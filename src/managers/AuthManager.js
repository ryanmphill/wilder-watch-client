export const loginUser = async (user) => {
    const res = await fetch("http://localhost:8000/login", {
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
    const res = await fetch("http://localhost:8000/register", {
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
    const res = await fetch(`http://localhost:8000/users/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      },
    })
    return await res.json()
}