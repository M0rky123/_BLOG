import { Router } from "express";
import { IPost } from "../schemas/PostScheme";
import { faker } from "@faker-js/faker/locale/cs_CZ";

const postRouter = Router();

const mockPosts: IPost[] = Array.from({ length: 50 }, (_, index) => {
  const content = faker.lorem.paragraphs(12);
  const tagArray = [
    { _id: "tag1", title: "tag1", link: "tag1" },
    { _id: "tag1", title: "tag2", link: "tag2" },
    { _id: "tag1", title: "tag3", link: "tag3" },
    { _id: "tag1", title: "tag4", link: "tag4" },
    { _id: "tag1", title: "tag5", link: "tag5" },
  ];
  let firstThreeSentences = "";
  let charCount = 0;

  const sentences = content.split(/(?<=[.?!])\s+/);

  for (const sentence of sentences) {
    if (charCount + sentence.length > 180) break;
    firstThreeSentences += sentence + " ";
    charCount += sentence.length;
  }

  firstThreeSentences = firstThreeSentences.trim() + " ...";

  return {
    _id: index,
    slug: `post-${index + 1}`,
    author: `Author ${index + 1}`,
    authorId: `author-${index + 1}`,
    title: `Post Title ${index + 1}`,
    content: firstThreeSentences,
    category: `Category ${index + 1}`,
    tags: Array.from({ length: Math.floor(Math.random() * 4) + 2 }, () => tagArray[Math.floor(Math.random() * tagArray.length)]),
    // published: Math.random() > 0.5,
    published: true,
    views: Math.floor(Math.random() * 100),
    likes: Math.floor(Math.random() * 100),
    comments: [],
  };
});

postRouter.get("/", async (req, res) => {
  const { offset = 0, limit = 10 } = req.query;
  const start = parseInt(offset as string, 10);
  const end = start + parseInt(limit as string, 10);
  const publishedPosts = mockPosts.filter((post) => post.published);
  res.json(publishedPosts.slice(start, end));
});

export default postRouter;
