import { useState } from "react";

type Item = { slug?: string; username?: string; title?: string; firstName?: string; lastName?: string };

type MultiSelectProps<T extends Item> = {
  type: string;
  items: Item[];
  selectedItems: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
};

const MultiSelect = <T extends Item>({ type, items, selectedItems, setSelected }: MultiSelectProps<T>) => {
  const title = { tag: "tagy", category: "kategorie", author: "autory" }[type] ?? type;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  return (
    <div className="relative group">
      <div className="flex justify-start mb-2 h-8">
        <label htmlFor={type} className="text-[--white] text-lg font-bold mr-2">
          {title.replace(/^\w/, (c) => c.toUpperCase())}
          {": "}
        </label>
        <ul className="flex flex-wrap gap-1">
          {selectedItems.map((item, index) => (
            <li
              key={("slug" in item ? item.slug ?? "" : item.username ?? "") + index}
              onClick={() =>
                setSelected((prev) =>
                  prev.filter(
                    (selectedItem) => ("slug" in selectedItem ? selectedItem.slug : selectedItem.username) !== ("slug" in item ? item.slug : item.username)
                  )
                )
              }
              className="bg-[--light-gray] text-[--white] rounded-sm p-1 px-2 hover:line-through hover:bg-[--dark-gray] hover:text-[--light-gray] cursor-pointer"
            >
              {"title" in item ? item.title : item.firstName + " " + item.lastName}
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        className="w-full border border-gray-300 text-[--black] rounded-md p-2"
        placeholder={`Hledejte ${title} ...`}
        value={searchTerm}
        onInput={(e) => setSearchTerm(e.currentTarget.value)}
        onFocus={() => setDropdownVisible(true)}
        onBlur={() => setTimeout(() => setDropdownVisible(false), 100)}
      />
      <ul
        className={`absolute left-0 w-full max-h-80 overflow-y-auto bg-white border border-gray-300 rounded mt-5 p-2 ${dropdownVisible ? "block" : "hidden"}`}
      >
        {items
          ?.filter((item) => {
            const itemKey = "slug" in item ? item.slug : item.username;
            return (
              !selectedItems.some((selectedItem) => ("slug" in selectedItem ? selectedItem.slug : selectedItem.username) === itemKey) &&
              ("title" in item ? item.title ?? "" : (item.firstName ?? "") + " " + (item.lastName ?? "")).toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .map((item, index) => {
            const key = ("slug" in item ? item.slug ?? "" : item.username ?? "") + index;
            const displayName = "title" in item ? item.title : item.firstName + " " + item.lastName;
            return (
              <li
                key={key}
                className="flex justify-between items-center gap-2 text-[--black]"
                onClick={() => {
                  setSelected((prev) => [...prev, item as T]);
                  setSearchTerm("");
                }}
              >
                <span className="flex-1 p-2 hover:bg-gray-200 cursor-pointer rounded-sm">{displayName}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MultiSelect;
