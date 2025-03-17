"use client";

import Wysiwyg from "@/components/Wysiwyg";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState(
    `<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
      <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
      <p><b>Rerum</b> <i>officiis</i> </i>exercitationem</i> corrupti voluptatum? Odio tempora qui minus, quod voluptatem voluptas possimus iste fugit laboriosam ex suscipit? Distinctio consequuntur eaque ea corrupti praesentium doloribus animi, laboriosam voluptas culpa aliquam.</p>
      <pre><code>Corporis aspernatur optio ipsam dolorem. Nisi illo quisquam laborum, repudiandae, esse quam, incidunt accusantium tempore reiciendis sit molestiae deserunt repellat ratione vero.</code></pre>
      <ul>
        <li>První položka</li>
        <li>Druhá položka</li>
        <li>Třetí položka</li>
      </ul>
      <ol>
        <li>První číslovaná položka</li>
        <li>Druhá číslovaná položka</li>
        <li>Třetí číslovaná položka</li>
      </ol>
      <blockquote>
        <p>Citace</p>
      </blockquote>`
  );
  return (
    <div>
      <Wysiwyg content={content} setContent={setContent} />
      {/* <div className="tiptap" dangerouslySetInnerHTML={{ __html: content }} /> */}
    </div>
  );
}
