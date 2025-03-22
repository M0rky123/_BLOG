"use client";

import Wysiwyg from "@/components/Wysiwyg";
import slugify from "@/libs/slugify";
import api from "@/utils/axiosInstance";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

// slug: { type: String, unique: true },
// author: { type: Types.ObjectId, ref: "User", required: true },
// title: { type: String, required: true },
// content: { type: String, required: true },
// perex: { type: String },
// category: { type: Types.ObjectId, ref: "Category", required: true },
// tags: { type: [Types.ObjectId], ref: "Tag", default: [] },
// published: { type: Boolean, default: false },
// views: { type: Number, default: 0 },
// likes: { type: Number, default: 0 },
// dislikes: { type: Number, default: 0 },

export default function Page() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [perex, setPerex] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<{ title: string; slug: string }[]>([]);
  const [content, setContent] = useState(
    `<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1><h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3><p><b>Rerum</b> <i>officiis</i> </i>exercitationem</i> corrupti voluptatum? Odio tempora qui minus, quod voluptatem voluptas possimus iste fugit laboriosam ex suscipit? Distinctio consequuntur eaque ea corrupti praesentium doloribus animi, laboriosam voluptas culpa aliquam.</p><pre><code>Corporis aspernatur optio ipsam dolorem. Nisi illo quisquam laborum, repudiandae, esse quam, incidunt accusantium tempore reiciendis sit molestiae deserunt repellat ratione vero.</code></pre><ul><li>První položka</li><li>Druhá položka</li></ul><ol><li>První číslovaná položka</li><li>Druhá číslovaná položka</li></ol><blockquote><p>Citace</p></blockquote>`
  );

  const [ownSlug, setOwnSlug] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ title: string; slug: string }[]>([]);
  const [tags, setTags] = useState<{ title: string; slug: string }[]>([]);
  const [tagsCount, setTagsCount] = useState(0);
  const [showSelect, setShowSelect] = useState(false);

  const [popup, setPopup] = useState<{ success: boolean; message: string } | null>(null);

  const postPost = async (published: boolean) => {
    const response = await api.post("/posts", {
      slug: slug,
      title: title,
      content: content,
      perex: perex,
      category: category,
      tags: selectedTags.map((tag) => tag.slug),
      publish: published,
    });

    const success = response.status === 200;
    const message = response.data.message;

    setPopup({ success, message });
  };

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
    api.get("/tags").then((res) => setTags(res.data));
  }, []);

  useEffect(() => {
    if (ownSlug) return;
    setSlug(slugify(title));
  }, [title, ownSlug]);

  return (
    <div className="flex flex-col gap-4">
      {popup && (
        <div className="fixed grid place-items-center z-50 inset-0 w-full h-full bg-black bg-opacity-60">
          <div className="bg-[--light-gray] p-4 rounded min-h-40">
            <p className="text-xl">{popup?.success ? "Vytvoření příspěvko bylo úspěšné" : "Nastala chyba"}</p>
            <br />
            <p>{popup?.message}</p>
            <br />
            <button
              className="bg-[--dark-gray] float-end px-3 py-2"
              onClick={() => {
                setPopup(null);
              }}
            >
              Zavřít
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-[3fr,4fr,4fr] gap-x-5 h-40">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Titulek příspěvku:</label>
            <input
              name="title"
              className="bg-[--dark-gray] p-1 rounded-sm focus:outline-none"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="odkaz">
              Odkaz:{" "}
              <span className="float-end">
                <input type="checkbox" checked={ownSlug} onChange={(e) => setOwnSlug(e.target.checked)} /> <span>Vlastní odkaz</span>
              </span>
            </label>

            <input
              className={`bg-[--dark-gray] p-1 rounded-sm focus:outline-none ${ownSlug ? "" : "bg-[--light-gray]"}`}
              disabled={!ownSlug}
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Kategorie: </label>
            <select name="category" className="bg-[--dark-gray] p-1 rounded-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Vyber kategorii</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tags">Tagy:</label>
            <div className="flex gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag.slug}
                  className="bg-[--dark-gray] p-1 rounded-sm cursor-pointer"
                  onClick={() => {
                    setSelectedTags(selectedTags.filter((t) => t.slug !== tag.slug));
                    setTags([...tags, tag]);
                    setTagsCount(tagsCount - 1);
                  }}
                >
                  {tag.title}
                </span>
              ))}
              {tagsCount < 5 && (
                <div className="relative">
                  <button className="bg-[--dark-gray] p-1 rounded-sm" onClick={() => setShowSelect(!showSelect)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  {showSelect && (
                    <div className="absolute top-0 left-0 bg-[--dark-gray] p-2 rounded-sm z-10">
                      {tags.map((tag) => (
                        <div
                          key={tag.slug}
                          className="cursor-pointer p-1 hover:bg-[--light-gray]"
                          onClick={() => {
                            setSelectedTags([...selectedTags, tag]);
                            setTags(tags.filter((t) => t.slug !== tag.slug));
                            setTagsCount(tagsCount + 1);
                            setShowSelect(false);
                          }}
                        >
                          {tag.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="perex">
            Popis článku: <span className="float-end">({perex.length} / 240 znaků)</span>
          </label>
          <textarea
            className="bg-[--dark-gray] h-full p-1 rounded-sm focus:outline-none"
            maxLength={240}
            value={perex}
            onChange={(e) => setPerex(e.target.value)}
          />
        </div>
      </div>
      <Wysiwyg content={content} setContent={setContent} />
      <div className="flex justify-end gap-2">
        <button
          className="bg-[--dark-gray] px-3 py-2"
          onClick={() => {
            postPost(false);
          }}
        >
          Uložit koncept
        </button>
        <button
          className="bg-[--light-gray] px-3 py-2"
          onClick={() => {
            postPost(true);
          }}
        >
          Publikovat
        </button>
      </div>
    </div>
  );
}
