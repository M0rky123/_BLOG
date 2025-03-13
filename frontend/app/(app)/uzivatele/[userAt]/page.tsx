import api from "@/utils/axiosInstance";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ userAt: string }> }) {
  const userAt = (await params).userAt;

  const request = await api.get(`/users/${userAt.replace("%40", "").replace("@", "")}`);

  if (request.status !== 200) {
    return notFound();
  }

  const user: {
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
  } = request.data;

  return (
    <div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>{user.role}</p>
    </div>
  );
}
