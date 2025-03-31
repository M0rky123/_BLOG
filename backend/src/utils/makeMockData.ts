import { fakerCS_CZ as faker } from "@faker-js/faker";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import CategoryModel from "../models/CategoryModel";
import TagModel from "../models/TagModel";
import RoleModel from "../models/RoleModel";
import CommentModel from "../models/CommentModel";
import PostModel from "../models/PostModel";

export function makeMockUsers(count: number) {
  const createFakeUsers = async (gender: "male" | "female") => {
    for (let i = 0; i < count; i++) {
      const firstName = faker.person.firstName(gender);
      const lastName = faker.person.lastName(gender);
      const username = faker.internet.username({ firstName: firstName, lastName: lastName });
      const email = faker.internet.email({ firstName: firstName, lastName: lastName });
      const password = await bcrypt.hash("password", 10);
      const role = "autor";

      await UserModel.create({ firstName: firstName, lastName: lastName, email: email, password: password, username: username });
    }
  };

  createFakeUsers("male");
  createFakeUsers("female");
}

export function makeMockRoles() {
  const roles = [
    { slug: "ctenar", title: "Čtenář" }, // muze cist prispevky, likovat, dislikovat, komentovat
    { slug: "autor", title: "Autor" }, // muze to co ctenar + psat prispevky
    // { name: "editor", displayName: "Editor" }, // muze to co autor + upravovat a schvalovat prispevky
    { slug: "admin", title: "Admin" }, // muze to co editor + spravovat uzivatele
  ];

  roles.forEach(async (role) => {
    await RoleModel.create(role);
  });
}

export function makeMockCategories() {
  const categories = [
    { title: "Web development", slug: "web-development" },
    { title: "Mobile development", slug: "mobile-development" },
    { title: "Data Science", slug: "data-science" },
    { title: "Machine Learning", slug: "machine-learning" },
    { title: "DevOps", slug: "devops" },
    { title: "Cybersecurity", slug: "cybersecurity" },
    { title: "Game development", slug: "game-development" },
    { title: "UI/UX", slug: "ui-ux" },
    { title: "Software Engineering", slug: "software-engineering" },
    { title: "Cloud Computing", slug: "cloud-computing" },
    { title: "Blockchain", slug: "blockchain" },
    { title: "Embedded Systems", slug: "embedded-systems" },
    { title: "Artificial Intelligence", slug: "artificial-intelligence" },
    { title: "Robotics", slug: "robotics" },
  ];

  categories.forEach(async (category) => {
    await CategoryModel.create(category);
  });
}

export function makeMockTags() {
  const tags = [
    { title: "JavaScript", slug: "javascript" },
    { title: "TypeScript", slug: "typescript" },
    { title: "React", slug: "react" },
    { title: "Vue", slug: "vue" },
    { title: "Angular", slug: "angular" },
    { title: "Node.js", slug: "nodejs" },
    { title: "Express", slug: "express" },
    { title: "NestJS", slug: "nestjs" },
    { title: "MongoDB", slug: "mongodb" },
    { title: "PostgreSQL", slug: "postgresql" },
    { title: "MySQL", slug: "mysql" },
    { title: "Docker", slug: "docker" },
    { title: "Kubernetes", slug: "kubernetes" },
  ];

  tags.forEach(async (tag) => {
    await TagModel.create(tag);
  });
}

interface IComment {
  authorId: string; // ID autora komentáře
  content: string; // Text komentáře
  likes: number;
  dislikes: number;
}

export async function makeMockComments(numberOfComments: number) {
  const authors = (await UserModel.find({}, "_id").lean()).map((author) => author._id.toString());
  const posts = (await PostModel.find({}, "_id").lean()).map((post) => post._id.toString());

  for (let i = 0; i < numberOfComments; i++) {
    const author = authors[Math.floor(Math.random() * authors.length)];
    const post = posts[Math.floor(Math.random() * posts.length)];
    const content = faker.lorem.paragraph({ min: 1, max: 10 });
    const likes = Math.floor(Math.random() * 100);
    const dislikes = Math.floor(Math.random() * 100);

    await CommentModel.create({ authorId: author, postId: post, content: content, likes: likes, dislikes: dislikes });
  }
}

interface IPost {
  slug: string;
  author: { name: string; slug: string };
  title: string;
  content: string;
  perex: string;
  category: string;
  tags: string[];
  published: boolean;
  views: number;
  likes: number;
  dislikes: number;
  comments: string[];
}

export async function makeMockPosts(numberOfPosts: number) {
  const tags = (await TagModel.find({}, "_id").lean()).map((tag) => tag._id.toString());
  const categories = (await CategoryModel.find({}, "_id").lean()).map((category) => category._id.toString());
  const authors = await UserModel.find({ role: "autor" }, { _id: 1 }).lean();
  const allComments = (await CommentModel.find({}, "_id").lean()).map((comment) => comment._id.toString());

  for (let i = 0; i < numberOfPosts; i++) {
    const slug = faker.lorem.slug({ min: 3, max: 5 });
    const author = authors[Math.floor(Math.random() * authors.length)];
    const title = faker.lorem.sentence({ min: 3, max: 5 });
    const content = faker.lorem.paragraphs(15);
    const perex = faker.lorem.paragraph();
    const category = categories[Math.floor(Math.random() * categories.length)];
    const tagCount = Math.floor(Math.random() * 5) + 1;
    const postTags = [];

    for (let j = 0; j < tagCount; j++) {
      postTags.push(tags[Math.floor(Math.random() * tags.length)]);
    }

    const published = Math.random() > 0.5;
    const views = Math.floor(Math.random() * 1000);
    const likes = Math.floor(Math.random() * 100);
    const dislikes = Math.floor(Math.random() * 100);
    const comments = [];

    for (let k = 0; k < Math.floor(Math.random() * 50); k++) {
      comments.push(allComments[Math.floor(Math.random() * comments.length)]);
    }

    await PostModel.create({
      slug: slug,
      author: author,
      title: title,
      content: content,
      perex: perex,
      category: category,
      tags: postTags,
      published: published,
      views: views,
      likes: likes,
      dislikes: dislikes,
      comments: comments,
    });
  }
}
