import api from "./utils/axiosInstance";

export async function login(loginMethod: string, password: string, remember: boolean) {
  const response = await api.post("/auth/login", {
    loginMethod,
    password,
    remember,
  });

  const data = response.data;

  if (response.status !== 200) {
    return { success: false, message: data.message };
  }

  return { success: true };
}

export async function register(firstName: string, lastName: string, email: string, password: string, username?: string) {
  const response = await api.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
    username,
  });

  const data = response.data;

  if (response.status !== 200) {
    return { success: false, message: data.message };
  }

  return { success: true, message: data.message, redirect: "/login" };
}

export async function logout() {
  const response = await api.post("/auth/logout");
  return response.data.success;
}
