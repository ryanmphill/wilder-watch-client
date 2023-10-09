import { apiUrl } from "../utils/config/apiConfig";

export const getAllStudyTypes = async () => {
    const res = await fetch(`${apiUrl}/study_types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}