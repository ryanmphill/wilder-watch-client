import { apiUrl } from "../utils/config/apiConfig";

export const getAllRegions = async () => {
    const res = await fetch(`${apiUrl}/regions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}