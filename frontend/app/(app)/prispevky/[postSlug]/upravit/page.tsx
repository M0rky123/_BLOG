import WysiwygEditor from "@/components/WysiwygEditor";
import api from "@/utils/axiosInstance";

export default async function Page({ params }: { params: Promise<{ postSlug: string }> }) {
  const { postSlug } = await params;

  const data: {
    category: { title: string; slug: string };
    content: string;
    perex: string;
    published: boolean;
    slug: string;
    tags: { title: string; slug: string }[];
    title: string;
  } = (await api.get(`/posts/${postSlug}`)).data;

  const tags: { title: string; slug: string }[] = (await api.get("/tags")).data;
  const categories: { title: string; slug: string }[] = (await api.get("/categories")).data;
  const consts = { tags, categories };

  return <WysiwygEditor params={data} consts={consts} />;
}
