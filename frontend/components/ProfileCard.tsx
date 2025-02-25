"use client";

import fetchUser from "@/libs/fetchUser";
import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ firstName: string; lastName: string; username: string }>();

  useEffect(() => {
    fetchUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="flex justify-between items-center p-3 rounded bg-[--light-gray] hover:bg-[--gray]">
      <Link href="/profile" className="flex items-center grow gap-3">
        <FontAwesomeIcon icon={faUser} className="text-lg border border-1 border-[--white] p-4 rounded-full" />
        <div>
          <div className="max-w-36 text-[--white] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {loading ? "Načítání..." : `${user?.firstName} ${user?.lastName}`}
          </div>
          <div className="max-w-36 text-[--white] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {loading ? "Načítání..." : `@${user?.username}`}
          </div>
        </div>
      </Link>
      <div className="pl-3">
        <LogoutButton text={<FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />} aspect_ratio />
      </div>
    </div>
  );
};

export default ProfileCard;
