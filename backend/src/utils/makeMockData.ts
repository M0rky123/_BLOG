import { fakerCS_CZ as faker } from "@faker-js/faker";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import CategoryModel from "../models/CategoryModel";
import TagModel from "../models/TagModel";

export function makeMockUsers(count: number) {
  const createFakeUsers = async (gender: "male" | "female") => {
    for (let i = 0; i < count; i++) {
      const firstName = faker.person.firstName(gender);
      const lastName = faker.person.lastName(gender);
      const email = faker.internet.email({ firstName: firstName, lastName: lastName });
      const password = await bcrypt.hash("password", 10);
      const username = faker.internet.username({ firstName: firstName, lastName: lastName });

      UserModel.create({ firstName: firstName, lastName: lastName, email: email, password: password, username: username });
    }
  };

  createFakeUsers("male");
  createFakeUsers("female");
}

export function makeMockCategories() {
  const categories = [
    { title: "Web development", slug: "web-development" },
    { title: "Mobile development", slug: "mobile-development" },
    { title: "Data Science", slug: "data-science" },
    { title: "Machine Learning", slug: "machine-learning" },
    { title: "DevOps", slug: "devops" },
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
