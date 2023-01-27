import { createContext } from "react";
import { putLang, dir } from "../../helper";
export const lang = {
    en: "en",
    ar: "ar",
};

export const LangContext = createContext({
    lang: lang.ar,
    changeLang: (lang) => {
        putLang(lang)


    },
});