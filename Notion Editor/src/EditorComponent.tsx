import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import Quote from '@editorjs/quote';




// Define the initial data type
const DEFAULT_INITIAL_DATA: OutputData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'Enter your notes here',
        level: 2, // level of text means h1 h2 h3 like levels
      },
    },
    {
      type : 'list',
      data : {
          style : "unordered",
          
      }
  },
  
  ],
};

const TextEditor: React.FC = () => {
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      // ID of the div should be added to tell where we want to load header
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        if (ejInstance.current) {
          const content = await ejInstance.current.save();
          console.log(content);
        }
      },
      tools: {
        header: Header,
        list:List,
        table:Table,
       checklist:Checklist,
        quote:Quote
        

      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-white text-black">
      <div id="editorjs"></div>
      {/* <TextUtils /> */}
    </div>
  );
};

export default TextEditor;
