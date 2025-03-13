import api from "@/utils/axiosInstance";

export default async function fetchUser() {
  try {
    const response = (await api.get("/auth/me")).data;
    return response;
  } catch {
    throw new Error("Nastala chyba při načítání uživatele!");
  }
}
