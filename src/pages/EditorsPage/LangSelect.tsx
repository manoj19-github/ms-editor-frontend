import React from "react";
import Select from "react-select";
import { customStyles } from "../../Constants/CustomStyles";
import { languageOptions } from "../../Constants/LangOptions";
import { ILangOption } from "../../interfaces/Ilang.interface";

const LangSelect = ({ onSelectChange, langId }: ILangSelect) => {
  return (
    <select
      placeholder={`select your lang`}
      className="bg-slate-600 rounded-md text-white px-2 py-2 outline-none border-none cursor-pointer"
      onChange={(e: any) => onSelectChange(+e.target.value)}
    >
      {languageOptions.map((lang: ILangOption, index: number) => (
        <option
          value={lang.id}
          key={index}
          className="p-1"
          selected={langId === lang.id}
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
};
interface ILangSelect {
  onSelectChange: any;
  langId: number;
}

export default LangSelect;
