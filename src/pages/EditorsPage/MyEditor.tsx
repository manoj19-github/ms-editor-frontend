import React, { useEffect, useRef, useState, forwardRef } from "react";
import Codemirror from "codemirror";
import Editor from "@monaco-editor/react";
import LangSelect from "./LangSelect";
import { ILangOption, ITheme } from "../../interfaces/Ilang.interface";
import ThemeSelect from "./ThemeSelect";
import { defineTheme } from "../../utils/defineTheme";
import { themeTypes } from "../../Types/theme.types";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { languageOptions } from "../../Constants/LangOptions";
import BtnLoader from "../../components/BtnLoader";

const MyEditor = ({
  myLang,
  setMyLang,
  myCode,
  setMyCode,
  myTheme,
  setMyTheme,
  compileFunc,
  isLoading,
}: IMyEditor) => {
  const handleLangChange = (_lang: number) => {
    const selectedLang: ILangOption | undefined = languageOptions.find(
      (sLang: ILangOption, index: number) => sLang.id === _lang
    );
    !!selectedLang && setMyLang(selectedLang);
  };

  function handleThemeChange(themeLabel: themeTypes) {
    const selectedTheme: any = Object.entries(monacoThemes).find(
      ([key, value]) => {
        return key === themeLabel;
      }
    );

    if (["light", "vs-dark"].includes(selectedTheme[0])) {
      setMyTheme({ label: selectedTheme[1], value: selectedTheme[0] });
    } else {
      defineTheme(themeLabel).then((_) =>
        setMyTheme({ label: selectedTheme[1], value: selectedTheme[0] })
      );
    }
  }
  useEffect(() => {
    defineTheme("blackboard").then((_) =>
      setMyTheme({ label: "Blackboard", value: "blackboard" })
    );
  }, []);
  const handleEditorChange = (value: any) => {
    setMyCode(value);
  };
  return (
    <div className="overlay  w-full h-full shadow-4xl  bg-slate-900">
      <Editor
        height="92vh"
        width={`100%`}
        language={myLang.value}
        value={myCode}
        theme={myTheme.value}
        defaultValue=""
        onChange={handleEditorChange}
      />
      <div className=" w-full px-5 flex justify-between items-center pt-1 ">
        <div className="flex space-x-2 items-center">
          <p className="text-white">Language : </p>
          <LangSelect onSelectChange={handleLangChange} langId={myLang.id} />
        </div>
        <div className="flex space-x-2 items-center">
          <p className="text-white">Theme : </p>
          <ThemeSelect
            handleThemeChange={handleThemeChange}
            theme={myTheme.value}
          />
        </div>

        <button
          onClick={() => compileFunc(true)}
          className="bg-red-400 hover:bg-[#475569]  duration-300 ease-in text-white  px-2 rounded-md w-[25%]  h-10 flex justify-center items-center"
        >
          {isLoading ? <BtnLoader /> : `Run`}
        </button>
      </div>
    </div>
  );
};

interface IMyEditor {
  myLang: ILangOption;
  myTheme: ITheme;
  myCode: string;
  setMyCode: any;
  setMyTheme: any;
  setMyLang: any;
  compileFunc: any;
  isLoading: any;
}

export default MyEditor;
