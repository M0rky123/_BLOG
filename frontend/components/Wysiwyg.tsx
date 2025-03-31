"use client";

import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faCode,
  faDroplet,
  faHeading,
  faHighlighter,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faMinus,
  faParagraph,
  faQuoteLeft,
  faRedo,
  faRemoveFormat,
  faStrikethrough,
  faTrashCan,
  faTurnDown,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditor, EditorContent } from "@tiptap/react";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import React, { Dispatch, SetStateAction, useState } from "react";

const Wysiwyg = ({ content, setContent }: { content: string; setContent: Dispatch<SetStateAction<string>>}) => {
  const [textColor, setTextColor] = useState<string>("#000000");
  const [highlightColor, setHighlightColor] = useState<string>("#0000ff");

  const editor = useEditor({
    extensions: [
      Blockquote,
      Bold,
      BulletList,
      CharacterCount,
      CodeBlock,
      Color,
      Document,
      HardBreak.configure({
        keepMarks: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      History,
      HorizontalRule,
      Italic,
      Link.configure({
        defaultProtocol: "https",
        shouldAutoLink: (url) => url.startsWith("https://"),
        protocols: [
          "mailto",
          "https",
          "http",
          {
            scheme: "tel",
            optionalSlashes: true,
          },
        ],
      }),
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Text,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Typography,
      Underline.configure({
        HTMLAttributes: {
          class: "tiptap-underline",
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: () => {
      setContent(content);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg">
      <div className="grid grid-cols-[8fr,8fr,4fr,2fr,2fr,1fr] gap-4">
        <div className="flex justify-evenly bg-[--light-gray] rounded-t py-2 *:px-2 *:w-9 *:h-6">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
            title="Tučný text (Ctrl+B)"
          >
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
            title="Kurzíva (Ctrl+I)"
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
            title="Přeškrtnutý text (Ctrl+Shift+S)"
          >
            <FontAwesomeIcon icon={faStrikethrough} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
            title="Podtržený text (Ctrl+U)"
          >
            <FontAwesomeIcon icon={faUnderline} />
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleLink({ href: prompt("Zadejte adresu odkazu:", "https://") || "" })
                .run()
            }
            title="Vložit odkaz (Ctrl+K)"
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <div className="relative">
            <button
              onClick={() => {
                document.getElementById("textColorInput")?.click();
              }}
              title="Barva textu"
            >
              <FontAwesomeIcon icon={faDroplet} />
            </button>
            <input
              id="textColorInput"
              type="color"
              value={textColor}
              onChange={(event) => {
                const color = event.currentTarget.value || textColor;
                setTextColor(color);
                editor.chain().focus().setColor(color).run();
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => {
                document.getElementById("highlightColorInput")?.click();
              }}
              className={editor.isActive("highlight", { color: highlightColor }) ? "is-active" : ""}
              title="Zvýraznění textu"
            >
              <FontAwesomeIcon icon={faHighlighter} />
            </button>
            <input
              id="highlightColorInput"
              type="color"
              value={highlightColor}
              onChange={(event) => {
                const color = event.currentTarget.value || highlightColor;
                setHighlightColor(color);
                editor.chain().focus().toggleHighlight({ color: color }).run();
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Odstranit formátování textu">
            <FontAwesomeIcon icon={faRemoveFormat} />
          </button>
        </div>
        <div className="flex justify-evenly bg-[--light-gray] rounded-t py-2 *:px-2">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
            title="Nadpis 1 (Ctrl+Alt+1)"
          >
            <FontAwesomeIcon icon={faHeading} size="lg" /> <b>1</b>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
            title="Nadpis 2 (Ctrl+Alt+2)"
          >
            <FontAwesomeIcon icon={faHeading} /> <b>2</b>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
            title="Nadpis 3 (Ctrl+Alt+3)"
          >
            <FontAwesomeIcon icon={faHeading} size="sm" /> <b>3</b>
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
            title="Odstavec (Ctrl+Alt+0)"
          >
            <FontAwesomeIcon icon={faParagraph} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
            title="Blokový kód (Ctrl+Alt+C)"
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
            title="Odrážkový seznam (Ctrl+Shift+8)"
          >
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Číslovaný seznam (Ctrl+Shift+7)">
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
            title="Citace (Ctrl+Shift+B)"
          >
            <FontAwesomeIcon icon={faQuoteLeft} />
          </button>
        </div>
        <div className="flex justify-evenly bg-[--light-gray] rounded-t py-2 *:px-2">
          <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
            <FontAwesomeIcon icon={faAlignCenter} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
            <FontAwesomeIcon icon={faAlignRight} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
            <FontAwesomeIcon icon={faAlignJustify} />
          </button>
        </div>
        <div className="flex justify-evenly bg-[--light-gray] rounded-t py-2 *:px-2">
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Vložit horizontální čáru">
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()} title="Vložit nový řádek">
            <FontAwesomeIcon icon={faTurnDown} rotation={90} />
          </button>
        </div>
        <div className="flex justify-evenly bg-[--light-gray] rounded-t py-2 *:px-2">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={!editor.can().chain().focus().undo().run() ? "text-gray-500" : ""}
            title="Zpět (Ctrl+Z)"
          >
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className={!editor.can().chain().focus().redo().run() ? "text-gray-500" : ""}
            title="Vrátit (Ctrl+Shift+Z)"
          >
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
        <div className="flex justify-evenly bg-[--light-gray] rounded-t py-2 *:px-2 text-red-500">
          <button
            onClick={() => {
              if (confirm("Opravdu chcete smazat celý obsah?")) {
                editor.chain().selectAll().deleteSelection().run();
              }
            }}
            title="Smazat celý obsah"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[200px] bg-[--dark-gray]" />
      <div className="flex justify-between mt-2 text-sm text-gray-300">
        <span>
          Slova:&nbsp;
          {editor.storage.characterCount.words()}
        </span>
        <span>
          Znaky:&nbsp;
          {editor.storage.characterCount.characters()}
        </span>
      </div>
    </div>
  );
};

export default Wysiwyg;
