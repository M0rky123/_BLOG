"use client";

import api from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function LogoutButton({ children, aspect_ratio }: { children: string | ReactNode; aspect_ratio?: boolean }) {
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/auth/logout");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`grid place-items-center bg-[--light-red] hover:bg-[--red] text-[--cream] text-lg p-2 rounded ${aspect_ratio ? "aspect-square" : ""}`}
    >
      {children}
    </button>
  );
}
