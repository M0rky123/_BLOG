import User, { TUser } from "@/components/User";
import api from "@/utils/axiosInstance";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const users: TUser[] = (await api.get("/users", { headers: { Cookie: `access_token=${token}` } })).data;

  return (
    <div className="grid grid-cols-2 gap-4">
      {users.map((user, index) => (
        <User key={user.username + "-" + index} user={user} />
      ))}
    </div>
  );
}
