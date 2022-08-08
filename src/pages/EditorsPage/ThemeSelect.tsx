import Select from "react-select";

import { customStyles } from "../../Constants/CustomStyles";
import { useState } from "react";
import { ITheme } from "../../interfaces/Ilang.interface";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { themeTypes } from "../../Types/theme.types";

const ThemeSelect = ({ handleThemeChange, theme }: IThemeSelect) => {
  const [themeList] = useState<ITheme[]>(
    Object.entries(monacoThemes).map(([key, value]) => ({
      label: key,
      value: value,
    }))
  );

  return (
    <select
      placeholder={`Select Theme`}
      className="bg-slate-600 rounded-md text-white px-2 py-2 outline-none border-none cursor-pointer"
      onChange={(e: any) => handleThemeChange(e.target.value)}
    >
      {themeList.map((_theme: ITheme, index: number) => (
        <option value={_theme.label}>{_theme.label}</option>
      ))}
    </select>
  );
};
interface IThemeSelect {
  handleThemeChange: any;
  theme: string;
}

export default ThemeSelect;
