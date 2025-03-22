"use client";

export type TUser = {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  restrictions: string[];
  roles: string[];
  updatedAt: string;
  username: string;
};

const User = ({ user }: { user: TUser }) => {
  return (
    <div className="p-2 rounded bg-[--dark-gray]">
      <p>
        {user.firstName} {user.lastName} <span className="text-[--light-gray]">(@{user.username})</span>
      </p>
      <p>{user.email}</p>
      <p>{user.roles}</p>
    </div>
  );
};

export default User;
