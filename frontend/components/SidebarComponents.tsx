import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const SidebarLink = ({ href, icon, text }: { href: string; icon: IconDefinition; text: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`p-3 rounded flex items-center gap-4 hover:bg-[--gray] ${isActive ? "bg-[--light-gray]" : "bg-transparent"}`}>
      <FontAwesomeIcon icon={icon} className="text-2xl aspect-square" />
      <span className="text-lg font-bold">{text}</span>
    </Link>
  );
};

interface ISidebarDropdown {
  icon: IconDefinition;
  title: string;
  children: React.ReactNode;
}

export const SidebarDropdown = ({ icon, title, children }: ISidebarDropdown) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-2 ${isOpen && "bg-[--gray]"}`}>
      <button
        className="flex items-center justify-between p-3 rounded text-base text-[--white] hover:bg-[--gray] bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`flex items-center gap-4`}>
          <FontAwesomeIcon icon={icon} className="text-2xl aspect-square" />
          <span className="text-lg font-bold">{title}</span>
        </div>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </button>
      <div className="flex flex-col p-2 pt-0 max-h-[180px] overflow-y-auto">{isOpen && children}</div>
    </div>
  );
};

export const SidebarDropdownItem = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link href={href} className="text-base px-4 py-2 hover:bg-[--light-gray] rounded">
      {title}
    </Link>
  );
};
