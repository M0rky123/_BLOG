"use client";

import api from "@/utils/axiosInstance";
import { faEye, faPencil, faThumbsDown, faThumbsUp, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export interface IPost {
  slug: string;
  author: { username: string; firstName: string; lastName: string };
  title: string;
  content: string;
  perex: string;
  category: { title: string };
  tags: { title: string; _id: string }[];
  published: boolean;
  views: number;
  likes: number;
  dislikes: number;
}

export default function Post({
  props,
  showEdit,
  showDelete,
  editRedirect,
  token,
}: {
  props: IPost;
  showEdit?: boolean;
  showDelete?: boolean;
  editRedirect?: string;
  token?: string;
}) {
  const { author, title, perex, slug, tags, category, views, likes, dislikes } = props;

  const onDelete = async (slug: string) => {
    if (confirm("Opravdu chcete smazat tento příspěvek?")) {
      await api.delete(`/posts/${slug}`, { headers: { Cookie: `access_token=${token}` } });
      alert("Příspěvek byl úspěšně smazán.");
      location.reload();
    }
  };

  return (
    <div className="flex flex-col bg-[--dark-gray] rounded-md shadow-md">
      <div className="flex-1 flex flex-col gap-3 p-5">
        <h2 className="w-full flex justify-between text-xl font-bold">
          <Link href={`/prispevky/${slug}`} prefetch={false}>
            {title}
          </Link>
          <div className="flex gap-2">
            {showEdit && editRedirect && (
              <Link href={editRedirect} className="grid place-items-center p-1 aspect-square rounded-sm bg-[--light-gray]">
                <FontAwesomeIcon icon={faPencil} size="sm" />
              </Link>
            )}
            {showDelete && (
              <span className="grid place-items-center py-1 aspect-square rounded-sm bg-red-500 cursor-pointer" onClick={() => onDelete(slug)}>
                <FontAwesomeIcon icon={faTrash} size="sm" />
              </span>
            )}
          </div>
        </h2>
        <p className="flex-1 ">{perex}</p>
        <div className="flex justify-start flex-wrap gap-2">
          <span className="h-fit bg-[--light-gray] text-[--white] rounded-md px-3 py-1 whitespace-nowrap">{category.title}</span>
          {tags.map((tag, index) => (
            <span key={tag._id + index} className="h-fit bg-[--gray] text-[--white] rounded-md px-3 py-1">
              {tag.title}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-5 py-4 text-base bg-[--light-gray] rounded-b-md">
        <div className="flex gap-4">
          <span>
            <FontAwesomeIcon icon={faThumbsUp} /> {likes}
          </span>
          <span>
            <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
          </span>
          {/* <span>
            <FontAwesomeIcon icon={faComment} /> {(comments && comments.length) || 0}
          </span> */}
          <span>
            <FontAwesomeIcon icon={faEye} /> {views}
          </span>
        </div>

        <Link href={`/uzivatele/@${author.username}`} prefetch={false} className="ml-auto hover:text-[--gray] hover:bg-[--white] px-1 rounded-sm">
          <FontAwesomeIcon icon={faUser} /> {author.firstName} {author.lastName}
        </Link>
      </div>
    </div>
  );
}
