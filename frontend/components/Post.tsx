export interface IPost {
  _id: string;
  author: string;
  title: string;
  content: string;
  category: string;
  tags: [string];
  published: boolean;
  views: number;
  likes: number;
  comments: [string] | [];
}

export default function Post({ props }: { props: IPost }) {
  const { author, title, content, tags, published, views, likes, comments } = props;

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Author: {author}</p>
      <p>Tags: {tags.join(", ")}</p>
      <p>Published: {published ? "Yes" : "No"}</p>
      <p>Views: {views}</p>
      <p>Likes: {likes}</p>
      <p>Comments: {comments.length}</p>
    </div>
  );
}
