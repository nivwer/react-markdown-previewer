import { useState, useEffect } from "react";
import { marked } from "marked";

function Markdown() {
  marked.setOptions({
    mangle: false,
    headerIds: false,
    breaks: true,
    gfm: true,
  });

  function useMarked() {
    const [text, setText] = useState(" ");
    const event = (e) => {
      setText(e.target.value);
    };

    useEffect(() => {
      const fetchText = async () => {
        try {
          const response = await fetch('data.txt');
          const content = await response.text();
          setText(content);
        } catch (error) {
          console.error("Error fetching Data:", error);
        }
      };

      fetchText();
    }, []);

    const markdown = marked(text);

    return [text, { event, markdown }];
  }

  const [text, { event, markdown }] = useMarked();

  return (
    <>
      <div className="bg-black row min-vh-100 vw-100 mx-auto">
        <div className="col-lg-6 p-4 container_responsive">
          <h2 className="text-center text-light-emphasis">Editor</h2>
          <textarea
            id="editor"
            className="text-dark-emphasis text-break w-100 border border-end-0 border-dark border-1 p-4 overflow-auto bg-black"
            onChange={event}
            value={text}
          ></textarea>
        </div>
        <div className="col-lg-6 p-4 container_responsive">
          <h2 className="text-center text-light-emphasis">Preview</h2>
          <div
            id="preview"
            className="text-dark-emphasis text-break w-100 p-4 overflow-auto border border-end-0 border-dark border-1"
            dangerouslySetInnerHTML={{ __html: markdown }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Markdown;
