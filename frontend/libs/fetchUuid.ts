import api from "@/utils/axiosInstance";

export default async function fetchUuid(setUuid: (uuid: string) => void) {
  const response = await api.get("/user/uuid");
  const data = response.data;

  setUuid(data.uuid);
}
