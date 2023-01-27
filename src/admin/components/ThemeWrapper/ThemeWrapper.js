import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { getThemeBg, putThemeBg } from "../../../helper";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(getThemeBg());
  function changeTheme(theme) {

    putThemeBg(theme)
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("white-content");
        break;
      case themes.dark:
      default:
        document.body.classList.remove("white-content");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
