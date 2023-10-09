import { apiUrl } from "../utils/config/apiConfig";

export const profileLoader = async ({ params }) => {
  // The errorElement automatically catches any exceptions
  const res = await fetch(`${apiUrl}/users/${params.userId}`, {
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
    const res = await fetch(`${apiUrl}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    return await res.json()
}

export const getStudiesParticipated = async (id) => {
    const res = await fetch(`${apiUrl}/users/${id}/participated_studies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    return await res.json()
}

export const getStudiesAuthored = async (id) => {
    const res = await fetch(`${apiUrl}/users/${id}/authored_studies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    return await res.json()
}