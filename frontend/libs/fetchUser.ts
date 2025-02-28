import api from "@/utils/axiosInstance";

export default async function fetchUser() {
  try {
    const fetch = await api.get("/user");
    const response = fetch.data;

    return response;
  } catch {
    throw new Error("Nastala chyba při načítání uživatele!");
  }
}
