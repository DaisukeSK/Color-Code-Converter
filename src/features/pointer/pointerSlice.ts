import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { colorCodeType } from "../colorCode/colorCodeSlice";
import { positionType } from "../../type";

const initialState: positionType = {
  HSL_top: "",
  HSL_left: "",
  HSV_top: "",
  HSV_left: "",
  pointerManipulated: false,
};

const pointerSlice = createSlice({
  name: "pointer",
  initialState,
  reducers: {
    HSLtoPointer: (
      state: positionType,
      action: PayloadAction<colorCodeType>
    ) => {
      (state.HSL_top = Math.abs(action.payload.L * 2 - 200) - 12 + "px"),
        (state.HSL_left = action.payload.LS * 3.6 - 12 + "px"),
        (state.HSV_top = Math.abs(action.payload.V * 2 - 200) - 12 + "px"),
        (state.HSV_left = action.payload.VS * 3.6 - 12 + "px");
    },
    updatePointerPosition: (
      state: positionType,
      action: PayloadAction<{ top: number; left: number; id: string }>
    ) => {
      const top = action.payload.top;
      const left = action.payload.left;

      if (action.payload.id == "CS_HSL") {
        const LS = top == 200 || top == 0 ? 0 : (left * 100) / 360;
        const L = Math.abs(top / 2 - 100);
        const V = 100 * (L / 100 + (LS / 100) * Math.min(1 - L / 100, L / 100));
        const VS = V == 0 ? 0 : 200 * (1 - L / V);

        (state.HSL_top = top - 12 + "px"),
          (state.HSL_left = left - 12 + "px"),
          (state.HSV_top = Math.abs(V * 2 - 200) - 12 + "px"),
          (state.HSV_left = VS * 3.6 - 12 + "px");
      } else if (action.payload.id == "CS_HSV") {
        const VS = top == 200 ? 0 : (left * 100) / 360;
        const V = Math.abs(top / 2 - 100);
        const L = 100 * ((V / 100) * (1 - VS / 100 / 2));
        const LS =
          L == 0 || L == 100
            ? 0
            : 100 * ((V / 100 - L / 100) / Math.min(L / 100, 1 - L / 100));

        (state.HSL_top = Math.abs(L * 2 - 200) - 12 + "px"),
          (state.HSL_left = LS * 3.6 - 12 + "px"),
          (state.HSV_top = top - 12 + "px"),
          (state.HSV_left = left - 12 + "px");
      }
    },
    manipulatingPointer: (
      state: positionType,
      action: PayloadAction<boolean>
    ) => {
      state.pointerManipulated = action.payload;
    },
  },
});

export const { HSLtoPointer, updatePointerPosition, manipulatingPointer } =
  pointerSlice.actions;
export default pointerSlice.reducer;
