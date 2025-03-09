"use client";

import { faHouse, faCompass, faUserPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { SidebarLink } from "./SidebarComponents";
import ProfileCard from "./ProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    api.get("/user/roles");
  }, []);

  return (
    <div className={`relative ${open ? "w-80" : "w-24"}`}>
      <button onClick={() => setOpen(!open)} className={`absolute top-1/2 -translate-y-1/2 right-0 bg-[--gray] p-4 rounded-s-md cursor-pointer z-10`}>
        <FontAwesomeIcon icon={faChevronLeft} rotation={open ? undefined : 180} />
      </button>

      <div className="absolute top-0 right-0 h-full w-4 bg-[--dark-gray]"></div>

      <div className={`flex-shrink-0 flex flex-col justify-between p-4 h-screen bg-[--dark-gray] overflow-x-hidden`}>
        <section className="flex flex-col gap-6">
          <ProfileCard />

          <hr className="border-[--light-gray]" />

          <div className="flex flex-col gap-2">
            <SidebarLink href="/" icon={faHouse} text="Domů" />
            <SidebarLink href="/explore" icon={faCompass} text="Objevovat" />
            <SidebarLink href="/following" icon={faUserPlus} text="Sleduji" />
          </div>
        </section>

        <footer className="flex justify-center items-center text-[--white]">
          <span>2025 &copy; Vojtěch Smutný</span>
        </footer>
      </div>
    </div>
  );
}
