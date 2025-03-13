"use client";

import fetchUser from "@/libs/fetchUser";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfileCard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ firstName: string; lastName: string; username: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      setUser(user);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-between items-center p-2 rounded bg-[--light-gray] hover:bg-[--gray]">
      <Link href="/profile" className="flex items-center grow gap-3">
        <div className="grid place-items-center min-w-[48px] aspect-square border border-1 border-[--white] p-3 rounded-full">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div>
          <div className="max-w-36 text-[--white] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {loading ? "Načítání..." : `${user?.firstName} ${user?.lastName}`}
          </div>
          <div className="max-w-36 text-[--white] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {loading ? "Načítání..." : `@${user?.username}`}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfileCard;
