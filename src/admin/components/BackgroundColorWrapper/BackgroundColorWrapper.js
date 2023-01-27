import React, { useState } from "react";
import {
  BackgroundColorContext,
  backgroundColors,
} from "../../contexts/BackgroundColorContext";
import { getTheme,putTheme } from "../../../helper";
export default function BackgroundColorWrapper(props) {
  const [color, setColor] = useState(getTheme());

  function changeColor(color) {
    putTheme(color)
    setColor(color);
  }

  return (
    <BackgroundColorContext.Provider
      value={{ color: color, changeColor: changeColor }}
    >
      {props.children}
    </BackgroundColorContext.Provider>
  );
}
