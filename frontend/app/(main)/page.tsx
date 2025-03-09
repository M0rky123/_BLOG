"use client";

import MultiSelect from "@/components/MultiSelect";
import Post, { IPost } from "@/components/Post";
import api from "@/utils/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { CircularLoading } from "respinner";
import { InView } from "react-intersection-observer";

export default function Page() {
  // const searchParams = useSearchParams();

  // infinity scroll constants
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // filtering constants
  const [tags, setTags] = useState<{ slug: string; title: string }[]>([]);
  const [categories, setCategories] = useState<{ slug: string; title: string }[]>([]);
  const [authors, setAuthors] = useState<{ username: string; firstName: string; lastName: string }[]>([]);

  const [selectedTags, setSelectedTags] = useState<{ slug: string; title: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ slug: string; title: string }[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<{ username: string; firstName: string; lastName: string }[]>([]);

  const fetchPosts = useCallback(
    async (offset: number) => {
      const authorsFilter = selectedAuthors.map((author) => author.username).join(",");
      const categoriesFilter = selectedCategories.map((category) => category.slug).join(",");
      const tagsFilter = selectedTags.map((tag) => tag.slug).join(",");

      const response = await api.get(`/post/posts?offset=${offset}&limit=${24}&authors=${authorsFilter}&categories=${categoriesFilter}&tags=${tagsFilter}`);
      const fetchedPosts: IPost[] = response.data.posts;

      setHasMore(response.data.hasMore);
      return fetchedPosts;
    },
    [selectedAuthors, selectedCategories, selectedTags]
  );

  const updatePosts = useCallback(
    async (offset: number) => {
      setLoading(true);

      const fetchedPosts = await fetchPosts(offset);

      setPosts((prevPosts) => prevPosts.concat(fetchedPosts));
      setOffset((prev) => prev + fetchedPosts.length);

      setLoading(false);
    },
    [fetchPosts]
  );

  useEffect(() => {
    const fetchData = async () => {
      const [tagsResponse, categoriesResponse, authorsResponse] = await Promise.all([
        api.get("/tag/tags"),
        api.get("/category/categories"),
        api.get("/user/authors"),
      ]);

      setTags(tagsResponse.data);
      setCategories(categoriesResponse.data);
      setAuthors(authorsResponse.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOffset(0);
    setPosts([]);
    updatePosts(0);
  }, [selectedAuthors, selectedCategories, selectedTags, updatePosts]);

  useEffect(() => {
    if (!loadMore) return;
    updatePosts(offset);
    setLoadMore(false);
  }, [offset, loadMore, updatePosts]);

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-5 *:flex-1 z-20">
        <MultiSelect type="tag" items={tags} selectedItems={selectedTags} setSelected={setSelectedTags} />
        <MultiSelect type="category" items={categories} selectedItems={selectedCategories} setSelected={setSelectedCategories} />
        <MultiSelect type="author" items={authors} selectedItems={selectedAuthors} setSelected={setSelectedAuthors} />
      </div>
      <div className="grid grid-cols-3 gap-5 z-10">
        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CircularLoading size={80} duration={1} className="stroke-white" />
          </div>
        )}
        {posts.map((post, index) => (
          <Post key={post.slug + index} props={post} />
        ))}
        {posts.length === 0 && !loading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Žádné příspěvky</div>}
      </div>
      {hasMore && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setLoadMore(true);
          }}
          className="w-full bg-[--light-gray] py-5 text-center cursor-pointer"
        >
          Načíst více příspěvků
        </button>
      )}
    </div>
  );
}
