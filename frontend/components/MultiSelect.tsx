import { useState } from "react";
type Item = { slug?: string; username?: string; title?: string; firstName?: string; lastName?: string };

type MultiSelectProps<T extends Item> = {
  type: string;
  items: T[];
  selectedItems: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
};

const MultiSelect = <T extends Item>({ type, items, selectedItems, setSelected }: MultiSelectProps<T>) => {
  const title = { tag: "tagy", category: "kategorie", author: "autory" }[type] ?? type;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const handleItemClick = (item: T) => {
    setSelected((prev) => [...prev, item]);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col relative group">
      <div className="flex-1 flex justify-start mb-2 h-8">
        <label htmlFor={type} className="text-[--white] text-lg font-bold mr-2">
          {title.replace(/^\w/, (c) => c.toUpperCase()) + ": "}
        </label>
        <ul className="flex flex-wrap gap-1">
          {selectedItems.map((item, index) => (
            <li
              key={("slug" in item ? item.slug ?? "" : item.username ?? "") + index}
              onClick={() =>
                setSelected((prev) =>
                  prev.filter((selectedItem) => ("slug" in selectedItem ? selectedItem.slug : selectedItem.username) !== (item.slug ?? item.username))
                )
              }
              className="bg-[--light-gray] text-[--white] rounded-sm p-1 px-2 hover:line-through hover:bg-[--dark-gray] hover:text-gray-400 cursor-pointer"
            >
              {item.title ?? item.username}
            </li>
          ))}
        </ul>
      </div>
      <div
        onFocus={() => setDropdownVisible(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setDropdownVisible(false);
          }
        }}
      >
        <input
          type="text"
          className="w-full border border-gray-300 text-[--black] rounded-md p-2 focus:outline-none focus:bg-[--light-gray] focus:text-[--white]"
          placeholder={`Hledejte ${title} ...`}
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
        />
        <ul
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
          className={`z-50 absolute top-full left-0 w-full max-h-80 overflow-y-auto bg-white border border-gray-300 rounded p-2 ${
            dropdownVisible ? "block" : "hidden"
          }`}
        >
          {items?.filter((item) => {
            const itemKey = item.slug ?? item.username;
            const itemName = item.title ?? `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
            return (
              itemKey &&
              !selectedItems.some((selectedItem) => (selectedItem.slug ?? selectedItem.username) === itemKey) &&
              itemName.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }).length === 0 ? (
            <li className="text-[--black] p-2">
              {type === "tag"
                ? "Hledaný výraz neodpovídá žádnému tagu"
                : type === "author"
                ? "Hledaný výraz neodpovídá žádnému autorovi"
                : "Hledaný výraz neodpovídá žádné kategorii"}
            </li>
          ) : (
            items
              ?.filter((item) => {
                const itemKey = item.slug ?? item.username;
                const itemName = item.title ?? `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
                return (
                  itemKey &&
                  !selectedItems.some((selectedItem) => (selectedItem.slug ?? selectedItem.username) === itemKey) &&
                  itemName.toLowerCase().includes(searchTerm.toLowerCase())
                );
              })
              .map((item, index) => (
                <li key={item.slug ?? item.username + " " + index} className="flex justify-between items-center gap-2 text-[--black]">
                  <button
                    onClick={() => handleItemClick(item)}
                    className="flex-1 p-2 focus:bg-[--light-gray] focus:text-[--white] focus:outline-none hover:text-[--black] hover:bg-gray-200 cursor-pointer rounded-sm"
                  >
                    {item.title ?? item.username}
                  </button>
                </li>
              ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelect;
