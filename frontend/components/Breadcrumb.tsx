"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);

  return (
    <nav aria-label="breadcrumb" className="text-lg text-gray-500 pb-5">
      <ul className="flex space-x-2">
        <li>
          <Link href="/prispevky" className="text-blue-500 hover:underline">
            Domů
          </Link>
        </li>
        {pathParts.map((part, index) => {
          if (part === "prispevky") return null;
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">{">"}</span>
              {isLast ? (
                <span className="text-gray-300">{decodeURIComponent(part)}</span>
              ) : (
                <Link href={href} className="text-blue-500 hover:underline">
                  {decodeURIComponent(part)}
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
