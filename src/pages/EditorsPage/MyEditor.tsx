import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import Editor from "@monaco-editor/react";

const MyEditor = () => {
  const editorRef = useRef<any>();
  //   useEffect(() => {
  // async function init() {
  //   editorRef.current = Codemirror.fromTextArea(
  //     document.getElementById("realtimeEditor") as HTMLTextAreaElement,
  //     {
  //       mode: { name: "javascript", json: true },
  //       theme: "dracula",
  //       autoCloseTags: true,
  //       autoCloseBrackets: true,
  //       lineNumbers: true,
  //       autocorrect: true,
  //       lineWrapping: true,
  //     }
  //   );
  // }
  // editorRef.current.on('change', (instance, changes) => {
  //     const { origin } = changes;
  //     const code = instance.getValue();
  //     onCodeChange(code);
  //     if (origin !== 'setValue') {
  //         socketRef.current.emit(ACTIONS.CODE_CHANGE, {
  //             roomId,
  //             code,
  //         });
  //     }
  // });]
  //     //}
  //     init();
  //   }, []);
  return (
    <div className="overlay overflow-hidden w-full h-full shadow-4xl  bg-slate-900">
      <Editor
        height="92vh"
        width={`100%`}
        language={"javascript"}
        value={""}
        defaultValue="// some comment"
        onChange={() => {}}
      />
    </div>
  );
};

export default MyEditor;
