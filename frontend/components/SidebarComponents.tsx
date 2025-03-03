import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";

export const SidebarLink = ({ href, icon, text }: { href: string; icon: IconDefinition; text: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={false}
      className={`p-3 pl-5 rounded flex items-center gap-4 hover:bg-[--gray] ${isActive ? "bg-[--light-gray]" : "bg-transparent"}`}
    >
      <FontAwesomeIcon icon={icon} className="text-2xl aspect-square pr-2" />
      <span className="text-lg font-bold">{text}</span>
    </Link>
  );
};
