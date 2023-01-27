import React, { useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import { getLang,putLang } from "../../../helper";
export default function LangWrapper(props) {
  const [lang, setLang] = useState(getLang());

  function changeLang(lang) {
    putLang(lang)
    setLang(lang);
  }

  return (
    <LangContext.Provider
      value={{ lang: lang, changeLang: changeLang }}
    >
      {props.children}
    </LangContext.Provider>
  );
}
