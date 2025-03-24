"use client";

import { useEffect, useState } from "react";

export type TUser = {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  restrictions: string[];
  role: string[];
  updatedAt: string;
  username: string;
};

const User = ({ user }: { user: TUser }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [modified, setModified] = useState(false);
  const { createdAt } = user;
  const roles = [
    { slug: "admin", title: "Admin" },
    { slug: "autor", title: "Autor" },
    { slug: "ctenar", title: "Čtenář" },
  ];

  useEffect(() => {
    setModified(true);
  }, [firstName, lastName, username, email, role]);

  return (
    <div className="p-2 rounded bg-[--dark-gray]">
      <div className="flex justify-between">
        <p>
          {firstName} {lastName} <span className="text-gray-400">(@{username})</span>
        </p>
        <p>Členem: {new Date(createdAt).toLocaleString("cs")}</p>
      </div>
      <p>E-mail: {email}</p>
      <select className="p-1 bg-[--light-gray]" defaultValue={role} onChange={(e) => setRole([e.target.value])}>
        {roles.map((role, i) => (
          <option key={i} value={role.slug}>
            {role.title}
          </option>
        ))}
      </select>
      {
        <button className="p-1 bg-[--light-gray] disabled:bg-[--gray]" disabled={modified}>
          Uložit
        </button>
      }
    </div>
  );
};

export default User;
