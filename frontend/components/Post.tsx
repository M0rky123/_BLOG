import { faComment, faEye, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export interface IPost {
  slug: string;
  author: { name: string; slug: string };
  title: string;
  content: string;
  perex: string;
  category: string;
  tags: { title: string; _id: string }[];
  published: boolean;
  views: number;
  likes: number;
  dislikes: number;
  comments: string[];
}

export default function Post({ props }: { props: IPost }) {
  const { author, title, perex, slug, tags, views, likes, comments } = props;

  return (
    <div className="flex flex-col bg-[--dark-gray] rounded-md shadow-md">
      <div className="flex-1 flex flex-col gap-2 p-5">
        <h2 className="text-xl font-bold">
          <Link href={`/post/${slug}`} prefetch={false}>
            {title}
          </Link>
        </h2>
        <p className="flex-1 ">{perex}</p>
        <div className="flex justify-start gap-2">
          {tags.map((tag, index) => (
            <span key={tag._id + index} className="bg-[--gray] text-[--white] rounded-md px-3 py-1">
              {tag.title}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-5 pr-4 py-4 text-base bg-[--light-gray] rounded-b-md">
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

        <Link href={`/user/@${author.slug}`} prefetch={false} className="ml-auto hover:text-[--gray] hover:bg-[--white] px-1 rounded-sm">
          <FontAwesomeIcon icon={faUser} /> {author.name}
        </Link>
      </div>
    </div>
  );
}
