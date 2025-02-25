"use client";

import Logo from "./Logo";
import { faHouse, faCompass, faUserPlus, faIcons } from "@fortawesome/free-solid-svg-icons";
import { SidebarDropdown, SidebarDropdownItem, SidebarLink } from "./SidebarComponents";
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import ProfileCard from "./ProfileCard";

export default function Sidebar() {
  const [categories, setCategories] = useState<{ _id: string; title: string; slug: string }[]>([]);

  async function fetchCategories() {
    const response = await api.get("http://localhost:5000/api/categories");
    setCategories(response.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex-shrink-0 flex flex-col justify-between w-80 p-4 h-screen bg-[--dark-gray]">
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Logo size={64} />
          <span className="flex-1 text-[--white] text-xl font-bold">
            Internetový <br /> Blog
          </span>
        </div>

        <hr className="border-[--light-gray]" />

        <div className="flex flex-col gap-2">
          <SidebarLink href="/" icon={faHouse} text="Domů" />
          <SidebarLink href="/explore" icon={faCompass} text="Objevovat" />
          <SidebarLink href="/following" icon={faUserPlus} text="Sleduji" />
        </div>

        <hr className="border-[--light-gray]" />

        <SidebarDropdown icon={faIcons} title="Kategorie">
          {categories.map((category) => (
            <SidebarDropdownItem key={category._id} href={`/category/${category.slug}`} title={category.title} />
          ))}
        </SidebarDropdown>
      </section>
      <div>
        <ProfileCard />
      </div>
    </div>
  );
}
