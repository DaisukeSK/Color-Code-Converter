import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export interface colorCodeType {
  H: number;
  LS: number;
  L: number;
  VS: number;
  V: number;
  Hexa: string;
  R: number;
  G: number;
  B: number;
  C: number;
  M: number;
  Y: number;
  K: number;
  opacity: number;
}

const initialState: colorCodeType = {
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
};

const colorCodeSlice = createSlice({
  name: "colorCode",
  initialState,
  reducers: reducers,
});

export const {
  inputChanged,
  inputHexaChanged,
  HSLtoHSV,
  HSVtoHSL,
  HSLtoRGB,
  RGBtoHexa,
  RGBtoCMYK,
  CMYKtoRGB,
  RGBtoHSL,
  HexaToRGB,
} = colorCodeSlice.actions;
export default colorCodeSlice.reducer;
