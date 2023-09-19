export const getSingleUser = async (id) => {
    const res = await fetch(`http://localhost:8000/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    return await res.json()
}