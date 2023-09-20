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

export const getStudiesParticipated = async (id) => {
    const res = await fetch(`http://localhost:8000/users/${id}/participated_studies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    return await res.json()
}

export const getStudiesAuthored = async (id) => {
    const res = await fetch(`http://localhost:8000/users/${id}/authored_studies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    return await res.json()
}