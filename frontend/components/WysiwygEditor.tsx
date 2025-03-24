"use client";

import { useState } from "react";
import Wysiwyg from "./Wysiwyg";
import api from "@/utils/axiosInstance";

const WysiwygEditor = ({
  params,
  consts,
}: {
  params: {
    slug: string;
    title: string;
    perex: string;
    published: boolean;
    category: { title: string; slug: string };
    tags: { title: string; slug: string }[];
    content: string;
  };
  consts: {
    tags: { title: string; slug: string }[];
    categories: { title: string; slug: string }[];
  };
}) => {
  const [slug, setSlug] = useState<string>(params.slug);
  const [title, setTitle] = useState<string>(params.title);
  const [perex, setPerex] = useState<string>(params.perex);
  const [published, setPublished] = useState<boolean>(params.published);
  const [postCategory, setPostCategory] = useState<{ title: string; slug: string }>(params.category);
  const [postTags, setPostTags] = useState<{ title: string; slug: string }[]>(params.tags);
  const [content, setContent] = useState<string>(params.content);
  const [popup, setPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const tags = consts.tags;
  const categories = consts.categories;

  const handleSave = (params: {
    slug: string;
    title: string;
    perex: string;
    published: boolean;
    category: { title: string; slug: string };
    tags: { title: string; slug: string }[];
    content: string;
  }) => {
    const data = {
      slug: params.slug,
      title: params.title,
      perex: params.perex,
      published: params.published,
      category: params.category.slug,
      tags: params.tags.map((tag) => tag.slug),
      content: params.content,
    };

    api.put(`/posts/${params.slug}`, data).then((res) => setPopupMessage(res.data.message));
  };

  return (
    <div className="flex flex-col gap-y-4">
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[--dark-gray] p-6 rounded-md shadow-md">
            <p className="mb-4">{popupMessage}</p>
            <button
              autoFocus={popup}
              className="bg-[--light-gray] hover:bg-[--gray] text-white px-4 py-2 rounded-md float-right"
              onClick={() => setPopup(false)}
            >
              Zavřít
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2">
            Nadpis
          </label>
          <input
            name="title"
            type="text"
            defaultValue={title}
            className="px-2 py-1 text-black rounded-sm focus:outline-none focus:bg-[--dark-gray] focus:text-white"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="slug" className="mb-2">
            Odkaz
          </label>
          <input
            name="slug"
            type="text"
            defaultValue={slug}
            className="px-2 py-1 text-black rounded-sm focus:outline-none focus:bg-[--dark-gray] focus:text-white"
            onChange={(e) => setSlug(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col h-full">
          <label htmlFor="perex" className="mb-2">
            <span>{perex.length} znaků z 240</span>
          </label>
          <textarea
            name="perex"
            defaultValue={perex}
            maxLength={240}
            className="h-full px-2 py-1 text-black rounded-sm focus:outline-none focus:bg-[--dark-gray] focus:text-white"
            onChange={(e) => setPerex(e.currentTarget.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Kategorie</p>
            <select
              className="px-2 py-1 text-black rounded-sm focus:outline-none focus:bg-[--dark-gray] w-full focus:text-white"
              value={postCategory.slug}
              onChange={(e) => setPostCategory(categories.find((category) => category.slug === e.target.value) || postCategory)}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2">Tagy</p>
            <div className="grid grid-cols-2 gap-y-1">
              {tags.map((tag) => (
                <div key={tag.slug} className="flex gap-2">
                  <input
                    type="checkbox"
                    id={tag.slug}
                    name="tags"
                    value={tag.slug}
                    checked={postTags.some((postTag) => postTag.slug === tag.slug)}
                    disabled={!postTags.some((postTag) => postTag.slug === tag.slug) && postTags.length >= 5}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPostTags([...postTags, tag]);
                      } else {
                        setPostTags(postTags.filter((postTag) => postTag.slug !== tag.slug));
                      }
                    }}
                  />
                  <label htmlFor={tag.slug}>{tag.title}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Wysiwyg content={content} setContent={setContent} />
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="published">Publikováno:</label>
          <input type="checkbox" id="published" name="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4" />
        </div>
        <button
          className="bg-[--dark-gray] hover:bg-[--light-gray] text-white px-4 py-2 rounded-md"
          onClick={() => {
            handleSave({ slug, title, perex, published: published, category: postCategory, tags: postTags, content });
            setPopup(true);
          }}
        >
          Uložit
        </button>
      </div>
    </div>
  );
};

export default WysiwygEditor;
