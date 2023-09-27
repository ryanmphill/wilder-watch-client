export const profileLoader = async ({ params }) => {
  // The errorElement automatically catches any exceptions
  const res = await fetch(`http://localhost:8000/users/${params.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
  if (!res.ok) {
    throw new Response("Not Found", { status: res.status });
  }
  const data = await res.json()
  return data
}

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