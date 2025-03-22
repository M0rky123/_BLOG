import WysiwygEditor from "@/components/WysiwygEditor";
import api from "@/utils/axiosInstance";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: Promise<{ postSlug: string }> }) {
  const { postSlug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const data: {
    post: {
      category: { title: string; slug: string };
      content: string;
      perex: string;
      published: boolean;
      slug: string;
      tags: { title: string; slug: string }[];
      title: string;
    };
  } = (await api.get(`/posts/${postSlug}`, { headers: { Cookie: `access_token=${token}` } })).data;

  const tags: { title: string; slug: string }[] = (await api.get("/tags")).data;
  const categories: { title: string; slug: string }[] = (await api.get("/categories")).data;
  const consts = { tags, categories };

  return <WysiwygEditor params={data.post} consts={consts} />;
}
