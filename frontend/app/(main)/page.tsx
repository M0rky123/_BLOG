import Post, { IPost } from "@/components/Post";
import api from "@/utils/axiosInstance";

export default async function Page() {
  const response = await api.get("/posts?offset=0&limit=10");
  const initPosts: IPost[] = response.data;

  return (
    <div>
      <h1>Posts</h1>
      {initPosts.map((post) => (
        <Post key={post._id} props={post} />
      ))}
    </div>
  );
}
