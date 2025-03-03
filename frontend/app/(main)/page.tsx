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

  const [tags, setTags] = useState<{ slug: string; title: string }[]>([]);
  const [categories, setCategories] = useState<{ slug: string; title: string }[]>([]);
  const [authors, setAuthors] = useState<{ username: string; firstName: string; lastName: string }[]>([]);

  const [selectedTags, setSelectedTags] = useState<{ slug: string; title: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ slug: string; title: string }[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<{ username: string; firstName: string; lastName: string }[]>([]);

  // fetch posts
  const fetchPosts = async (reset = false) => {
    const response = await api.get(
      `/post/posts?offset=${offset}&limit=12&tags=${selectedTags.map((tag) => tag.slug).join(",")}&categories=${selectedCategories
        .map((category) => category.slug)
        .join(",")}&authors=${selectedAuthors.map((author) => author.username).join(",")}`
    );
    const fetchedPosts: IPost[] = response.data;

    if (reset) {
      setPosts(fetchedPosts);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
    }
    setHasMore(fetchedPosts.length > 0);
  };

  useEffect(() => {
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
    setOffset(0);
    fetchPosts(true);
  }, [selectedTags, selectedCategories, selectedAuthors]);

  return (
    <div>
      <div className="flex justify-between gap-5 *:flex-1 mb-5">
        <MultiSelect type="tag" items={tags} selectedItems={selectedTags} setSelected={setSelectedTags} />
        <MultiSelect type="category" items={categories} selectedItems={selectedCategories} setSelected={setSelectedCategories} />
        <MultiSelect type="author" items={authors} selectedItems={selectedAuthors} setSelected={setSelectedAuthors} />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {posts.map((post) => (
          <Post key={post.slug} props={post} />
        ))}
      </div>
      <div ref={ref} className={`bg-[--light-gray] text-[--white] mx-auto ${hasMore && "py-3 mt-5"} rounded text-center`}>
        {hasMore && <p>Načítám více příspěvků ...</p>}
      </div>
    </div>
  );
}
