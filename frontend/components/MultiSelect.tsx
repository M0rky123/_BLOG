import { useState } from "react";

export default function MultiSelect({
  items = [],
  onSelect,
}: {
  items: { id: string; name: string }[];
  onSelect: (tags: { id: string; name: string }[]) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative group">
      <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Search for tags ..." />
      <ul className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded mt-5 p-2 invisible group-focus-within:visible">
        {items &&
          items.map((item) => (
            <li key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSelect([item])}>
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
