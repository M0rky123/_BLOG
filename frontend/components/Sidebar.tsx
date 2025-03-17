"use client";

import { faHouse, faChevronLeft, faCirclePlus, faQuoteRight, faUser, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { SidebarLink } from "./SidebarComponents";
import ProfileCard from "./ProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import fetchUser from "@/libs/fetchUser";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState<{ firstName: string; lastName: string; username: string; roles: string[] }>({
    firstName: "",
    lastName: "",
    username: "",
    roles: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <div className={`relative ${open ? "w-80" : "w-24"}`}>
      <button onClick={() => setOpen(!open)} className={`absolute bottom-0 right-0 bg-[--gray] p-4 rounded-s-md cursor-pointer z-10`}>
        <FontAwesomeIcon icon={faChevronLeft} rotation={open ? undefined : 180} />
      </button>

      <div className="absolute top-0 right-0 h-full w-4 bg-[--dark-gray]"></div>

      <div className={`flex-shrink-0 flex flex-col justify-between p-4 h-screen bg-[--dark-gray] overflow-x-hidden`}>
        <section className="flex flex-col text-nowrap gap-6">
          <ProfileCard />

          <hr className="border-[--light-gray]" />

          <div className="flex flex-col gap-2">
            <SidebarLink href="/prispevky" icon={faHouse} text="Domů" />
            {/* <SidebarLink href="/sleduji" icon={faUserPlus} text="Sleduji" /> */}
          </div>

          {user.roles.includes("autor") && (
            <>
              <hr className="border-[--light-gray]" />
              <div className="flex flex-col gap-2 bg-">
                <SidebarLink href="/prispevky/novy" icon={faCirclePlus} text="Nový příspěvek" style="bg-cyan-800" />
                <SidebarLink href="/prispevky/vlastni" icon={faNewspaper} text="Tvé příspěvky" />
                <SidebarLink href="/prispevky/koncepty" icon={faQuoteRight} text="Tvé koncepty" />
              </div>
              <hr className="border-[--light-gray]" />
            </>
          )}

          {user.roles.includes("admin") && (
            <>
              <SidebarLink href="/admin/uzivatele" icon={faUser} text="Uživatelé" />
            </>
          )}
        </section>

        {open && (
          <footer className="flex justify-center items-center text-[--white] pr-[42px]">
            <span>2025 &copy; Vojtěch Smutný</span>
          </footer>
        )}
      </div>
    </div>
  );
}
