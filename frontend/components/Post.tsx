import { faComment, faEye, faHeart, faUpRightFromSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Tag from "./Tag";

export interface IPost {
  _id: string;
  author: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  slug: string;
  tags: [{ _id: string; title: string; link: string }];
  published: boolean;
  views: number;
  likes: number;
  comments: [string] | [];
}

export default function Post({ props }: { props: IPost }) {
  const { author, authorId, title, content, slug, tags, views, likes, comments } = props;

  return (
    <div className="flex flex-col bg-[--dark-gray] rounded-md shadow-md">
      <div className="flex-1 flex flex-col gap-4 p-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="flex-1">{content}</p>
        <div className="flex justify-start gap-2">
          {tags.map((tag) => (
            <Tag key={tag._id + Math.random()} title={tag.title} link={`/tag/${tag.link}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-between px-5 py-4 text-lg bg-[--light-gray] rounded-b-md">
        <div className="flex gap-4">
          <span>
            <FontAwesomeIcon icon={faHeart} className="text-red-500" /> {likes}
          </span>
          <span>
            <FontAwesomeIcon icon={faComment} /> {comments.length}
          </span>
          <span>
            <FontAwesomeIcon icon={faEye} /> {views}
          </span>
        </div>

        <div className="flex gap-2">
          <Link href={`/user/@${authorId}`} className="ml-auto hover:italic">
            <FontAwesomeIcon icon={faUser} /> {author}
          </Link>
          {"|"}
          <Link href={`/post/${slug}`} className=" hover:italic">
            {"Celý článek"} <FontAwesomeIcon icon={faUpRightFromSquare} />
          </Link>
        </div>
      </div>
    </div>
  );
}
