"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const list = [
  { path: "/prispevky", name: "Domů" },
  { path: "/prispevky/novy", name: "Nový příspěvek" },
  { path: "/prispevky/vlastni", name: "Tvé příspěvky" },
  { path: "/prispevky/koncepty", name: "Tvé koncepty" },
  { path: "/admin/uzivatele", name: "Správa uživatel" },
];

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);

  const filteredPathParts = pathParts.slice(pathParts[0] === "prispevky" || pathParts[0] === "uzivatele" || pathParts[0] === "admin" ? 1 : 0);

  return (
    <nav aria-label="breadcrumb" className="text-lg text-gray-500 pb-5">
      <ul className="flex space-x-2">
        <li>
          <Link href="/prispevky" className="text-blue-500 hover:underline">
            Domů
          </Link>
        </li>
        {filteredPathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === filteredPathParts.length - 1;

          let name = list.find((item) => item.path.endsWith(`/${part}`))?.name || decodeURIComponent(part);
          if (part.startsWith("@")) {
            name = decodeURIComponent(part);
          }

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">{">"}</span>
              {isLast ? (
                <span className="text-gray-300">{name}</span>
              ) : (
                <Link href={href} className="text-blue-500 hover:underline">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
