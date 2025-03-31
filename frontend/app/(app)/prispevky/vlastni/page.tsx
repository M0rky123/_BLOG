import Post, { IPost } from "@/components/Post";
import api from "@/utils/axiosInstance";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const user = await api.get("/auth/me", { headers: { Cookie: `access_token=${token}` } }).then((res) => res.data);
  const posts: IPost[] = await api
    .get("/posts?published=true&admin=true&authors=" + user.username, { headers: { Cookie: `access_token=${token}` } })
    .then((res) => res.data.posts);

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="flex flex-col gap-5 z-10">
        {posts.map((post: IPost, index) => (
          <Post key={post.slug + index} props={post} showEdit showDelete editRedirect={`/prispevky/${post.slug}/upravit`} token={token} />
        ))}
        {posts.length === 0 && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Žádné příspěvky</div>}
      </div>
    </div>
  );
}
