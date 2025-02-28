import Post, { IPost } from "@/components/Post";
import api from "@/utils/axiosInstance";

export default async function Page() {
  const response = await api.get("/posts?offset=0&limit=10");
  const initPosts: IPost[] = response.data;

  return (
    <div className="grid grid-cols-2 gap-5">
      {initPosts.map((post) => (
        <Post key={post._id} props={post} />
      ))}
    </div>
  );
}
