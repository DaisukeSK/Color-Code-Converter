import { useState, useEffect, useReducer, createContext } from "react";
import { Main } from "./StyledComponents.ts";
import { inputRangeBG, reducer } from "./Functions.ts";
import { SideBar } from "./components/Aside.tsx";
import { HSL } from "./components/ColorCode/HSL/HSL.tsx";
import { BG } from "./StyledComponents.ts";
import CMYK from "./components/ColorCode/CMYK.tsx";
import RGB from "./components/ColorCode/RGB.tsx";
import Hexa from "./components/ColorCode/Hexa.tsx";
import OutPut from "./components/ColorCode/OutPut.tsx";
import imgPath from "../public/tree.png";
import { ppType, rangeBGType, Context, builtInColorsType } from "./type";
import json from "./builtInColors.json";

export const builtInColors: builtInColorsType = { ...json };
export const AppContext = createContext<Context>({} as Context);

export function App() {
  const [ColorCodes, dispatch] = useReducer(reducer, {
    H: 210,
    LS: 50,
    L: 50,
    VS: 0,
    V: 0,
    Hexa: "",
    R: 0,
    G: 0,
    B: 0,
    C: 0,
    M: 0,
    Y: 0,
    K: 0,
    opacity: 1,
    manipulatingPointer: false,
  });

  const [textColor, setTextColor] = useState<boolean>(true);
  const [aside, setAside] = useState<boolean>(false);
  const [HSLtoggle, setHSLtoggle] = useState<boolean>(true);
  const [builtInColor, setBuiltInColor] = useState<Array<string | null>>([]);
  const [pointerPosition, setPointerPosition] = useState<ppType>({
    HSL_top: "",
    HSL_left: "",
    HSV_top: "",
    HSV_left: "",
  });
  const [rangeBG, setRangeBG] = useState<rangeBGType>({
    LS: "",
    L: "",
    VS: "",
    V: "",
    R: "",
    G: "",
    B: "",
    C: "",
    M: "",
    Y: "",
    K: "",
  });

  useEffect(() => {
    dispatch({ type: "HSLtoHSV" });
    dispatch({ type: "HSLtoRGB" });
    dispatch({ type: "RGBtoHexa" });
    dispatch({ type: "RGBtoCMYK" });

    // If put them in css, tree img shows up when loading page.
    document.body.style.background = `url(${imgPath})`;
    document.body.style.backgroundPositionX = `100px`;
    document.body.style.backgroundPositionY = `50px`;
    document.body.style.backgroundRepeat = `no-repeat`;
  }, []);

  useEffect(() => {
    if (!ColorCodes.manipulatingPointer) {
      setPointerPosition({
        HSL_top: Math.abs(ColorCodes.L * 2 - 200) - 12 + "px",
        HSL_left: ColorCodes.LS * 3.6 - 12 + "px",
        HSV_top: Math.abs(ColorCodes.V * 2 - 200) - 12 + "px",
        HSV_left: ColorCodes.VS * 3.6 - 12 + "px",
      });
      console.log("pointer");
    }

    setBuiltInColor(["--", null]);
    Object.keys(builtInColors).forEach((val: string) => {
      ColorCodes.Hexa == builtInColors[val]["hexa"] &&
        setBuiltInColor(
          builtInColors[val]["hexa"] == "#00FFFF"
            ? ["Aqua/Cyan", builtInColors[val]["hexa"]]
            : [val, builtInColors[val]["hexa"]]
        );
    });

    setTextColor(ColorCodes.L <= 50 ? true : false);
    inputRangeBG(ColorCodes, setRangeBG);
  }, [ColorCodes]);

  return (
    <AppContext.Provider
      value={{
        ColorCodes,
        dispatch,
        textColor,
        rangeBG,
        builtInColor,
        aside,
        pointerPosition,
        setAside,
        setPointerPosition,
        HSLtoggle,
        setHSLtoggle,
      }}
    >
      <BG aside={aside ? 1 : 0} colorcodes={ColorCodes} />
      <svg
        className="hamburger"
        width="35"
        height="22"
        fill={textColor ? "#ffffff" : "#000000"}
        onClick={() => {
          setAside(true);
        }}
      >
        <path d="M0 0 h35 v4 h-35 Z" />
        <path d="M0 9 h35 v4 h-35 Z" />
        <path d="M0 18 h35 v4 h-35 Z" />
      </svg>

      <SideBar />

      <Main aside={aside ? 1 : 0} onClick={() => aside && setAside(false)}>
        <OutPut />

        <div className="flex">
          <HSL />
          <div className="right">
            <Hexa />
            <RGB />
            <CMYK />
          </div>
        </div>
      </Main>
    </AppContext.Provider>
  );
}
