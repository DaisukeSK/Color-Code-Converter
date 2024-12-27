import { useState, useEffect, createContext } from "react";
import { Main } from "./StyledComponents.tsx";
import { check_Built_In_Color, inputRangeBG } from "./Functions.tsx";
import { SideBar } from "./components/Aside.tsx";
import { HSL } from "./components/ColorCode/HSL/HSL.tsx";
import { BG } from "./StyledComponents.tsx";
import CMYK from "./components/ColorCode/CMYK.tsx";
import RGB from "./components/ColorCode/RGB.tsx";
import Hexa from "./components/ColorCode/Hexa.tsx";
import OutPut from "./components/ColorCode/OutPut.tsx";
import imgPath from "../public/tree.png";
import { rangeBGType, Context, builtInColorsType } from "./type";
import { useAppSelector, useAppDispatch } from "./hooks.ts";
import {
  HSLtoHSV,
  HSLtoRGB,
  RGBtoHexa,
  RGBtoCMYK,
} from "./features/colorCode/colorCodeSlice.ts";
import {
  HSLtoPointer,
  manipulatingPointer,
} from "./features/pointer/pointerSlice.ts";
import json from "./builtInColors.json";

export const builtInColors: builtInColorsType = { ...json };
export const AppContext = createContext<Context>({} as Context);

export function App() {
  const dispatch = useAppDispatch();
  const colorCodes = useAppSelector((state) => state.colorCode);
  const pointerManipulated = useAppSelector(
    (state) => state.pointer.pointerManipulated
  );

  const [textColor, setTextColor] = useState<boolean>(true);
  const [aside, setAside] = useState<boolean>(false);
  const [HSLtoggle, setHSLtoggle] = useState<boolean>(true);
  const [builtInColor, setBuiltInColor] = useState<Array<string | null>>([]);
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
    dispatch(HSLtoHSV());
    dispatch(HSLtoRGB());
    dispatch(RGBtoHexa());
    dispatch(RGBtoCMYK());

    // If put them in css, tree img shows up when loading page.
    document.body.style.background = `url(${imgPath})`;
    document.body.style.backgroundPositionX = `100px`;
    document.body.style.backgroundPositionY = `50px`;
    document.body.style.backgroundRepeat = `no-repeat`;
  }, []);

  useEffect(() => {
    if (!pointerManipulated) {
      console.log("not moving");
      dispatch(HSLtoPointer(colorCodes));
    }

    setTextColor(colorCodes.L <= 50 ? true : false);
    inputRangeBG(colorCodes, setRangeBG);
    check_Built_In_Color(colorCodes, builtInColors, setBuiltInColor);

    dispatch(manipulatingPointer(false));
  }, [colorCodes]);

  return (
    <AppContext.Provider
      value={{
        textColor,
        rangeBG,
        builtInColor,
        aside,
        setAside,
        HSLtoggle,
        setHSLtoggle,
      }}
    >
      <BG aside={aside ? 1 : 0} colorcodes={colorCodes} />
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
