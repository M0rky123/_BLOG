import LikePost from "@/components/LikePost";
import api from "@/utils/axiosInstance";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: Promise<{ postSlug: string }> }) {
  const { postSlug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const data: {
    post: {
      author: { username: string };
      title: string;
      category: { title: string; slug: string };
      tags: { title: string; slug: string }[];
      content: string;
      likes: number;
      dislikes: number;
      views: number;
    };
    liked: boolean;
    disliked: boolean;
  } = (
    await api.get(`/posts/${postSlug}`, {
      headers: { Cookie: `access_token=${token}` },
    })
  ).data;

  const post = data.post;

  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center rounded-md">
        <span className="text-xl">{post.title}</span>
        <div className="flex gap-4">
          <LikePost slug={postSlug} _likes={post.likes} _dislikes={post.dislikes} _liked={data.liked} _disliked={data.disliked} />
          <span className="flex items-center gap-x-1">
            <FontAwesomeIcon icon={faEye} /> {post.views}
          </span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="tiptap p-4 rounded bg-[--dark-gray]" />
      <div className="flex justify-between">
        <span className="bg-[--light-gray] px-2 py-1 rounded">
          <FontAwesomeIcon icon={faUser} /> &nbsp;
          {post.author.username}
        </span>
        <div className="flex gap-2">
          <span className="bg-[--light-gray] px-2 py-1 rounded">{post.category.title}</span>
          <ul className="flex gap-2 *:bg-[--dark-gray]">
            {post.tags.map((tag, index) => (
              <li key={tag.slug + "-" + index} className="px-2 py-1 rounded">
                {tag.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
