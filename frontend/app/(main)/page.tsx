"use client";

import MultiSelect from "@/components/MultiSelect";
import Post, { IPost } from "@/components/Post";
import api from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Page() {
  // infinity scroll constants
  const [posts, setPosts] = useState<IPost[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  // filtering constants

  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);

  const [selectedTags, setSelectedTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<{ id: string; name: string }[]>([]);

  // infinity scroll effects

  useEffect(() => {
    async function fetchPosts() {
      const response = await api.get(`/posts?offset=${offset}&limit=12`);
      const fetchedPosts: IPost[] = response.data;
      setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
      setHasMore(fetchedPosts.length === 12);
    }

    if (hasMore) {
      fetchPosts();
    }
  }, [offset, hasMore]);

  useEffect(() => {
    if (inView && hasMore) {
      setOffset((prevOffset) => prevOffset + 12);
    }
  }, [inView, hasMore]);

  // filtering effects

  useEffect(() => {
    const fetchTags = async () => {
      const response = await api.get("/tag/tags");
      const fetchedTags = response.data;
      setTags(fetchedTags);
    };

    const fetchCategories = async () => {
      const response = await api.get("/category/categories");
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);
    };

    const fetchAuthors = async () => {
      const response = await api.get("/user/authors");
      const fetchedAuthors = response.data;
      setAuthors(fetchedAuthors);
    };

    fetchTags();
    fetchCategories();
    fetchAuthors();
  }, []);

  useEffect(() => {
    async function fetchFilteredPosts() {
      const response = await api.get(`/posts?tags=${selectedTags.join(",")}&categories=${selectedCategories.join(",")}&authors=${selectedAuthors.join(",")}`);
      const fetchedPosts: IPost[] = response.data;
      setPosts(fetchedPosts);
    }

    fetchFilteredPosts();
  }, [selectedTags, selectedCategories, selectedAuthors]);

  return (
    <div>
      <div className="flex justify-between gap-5 *:flex-1 mb-5">
        <MultiSelect items={tags} onSelect={setSelectedTags} />
        <MultiSelect items={categories} onSelect={setSelectedCategories} />
        <MultiSelect items={authors} onSelect={setSelectedAuthors} />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {posts.map((post) => (
          <Post key={post._id} props={post} />
        ))}
      </div>
      <div ref={ref} className={`${hasMore && "py-3"} bg-[--light-gray] text-[--white] mx-auto mt-5 rounded text-center`}>
        {hasMore && <p>Načítám více příspěvků ...</p>}
      </div>
    </div>
  );
}
