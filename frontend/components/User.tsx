"use client";

import api from "@/utils/axiosInstance";
import { useState } from "react";

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
  const [popup, setPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const handleUserEdit = async ({ username, role }: { username: string; role: string }) => {
    const res = await api.put(`/users/${username}`, { username, role });
    setPopup(true);
    setPopupMessage(res.data.message);
    if (res.status === 200) {
      setModified(false);
    }
  };

  return (
    <>
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[--dark-gray] p-6 rounded-md shadow-md">
            <p className="mb-4">{popupMessage}</p>
            <button
              autoFocus={popup}
              className="bg-[--light-gray] hover:bg-[--gray] text-white px-4 py-2 rounded-md float-right"
              onClick={() => setPopup(false)}
            >
              Zavřít
            </button>
          </div>
        </div>
      )}
      <div className="p-2 rounded bg-[--dark-gray]">
        <div className="flex justify-between">
          <p>
            {firstName} {lastName} <span className="text-gray-400">(@{username})</span>
          </p>
          <p>Členem: {new Date(createdAt).toLocaleString("cs")}</p>
        </div>
        <p>E-mail: {email}</p>
        <span>
          Role:&nbsp;
          <select
            className="p-1 bg-[--light-gray]"
            defaultValue={role}
            onChange={(e) => {
              setModified(true);
              setRole([e.target.value]);
            }}
          >
            {roles.map((role, i) => (
              <option key={i} value={role.slug}>
                {role.title}
              </option>
            ))}
          </select>
          {
            <button
              className="p-1 bg-[--light-gray] float-right disabled:bg-[--gray]"
              disabled={!modified}
              onClick={() => handleUserEdit({ username, role: role[0] })}
            >
              Uložit
            </button>
          }
        </span>
      </div>
    </>
  );
};

export default User;
