import { fakerCS_CZ as faker } from "@faker-js/faker";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

export default function fakeFillUsers(count: number) {
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
