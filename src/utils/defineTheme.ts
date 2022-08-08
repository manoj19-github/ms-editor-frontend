import { loader } from "@monaco-editor/react";
import { monacoThemes } from "../Constants/monacoTheme";
import { themeTypes } from "../Types/theme.types";



export const defineTheme = (theme:themeTypes) => {
  return new Promise<void>((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

