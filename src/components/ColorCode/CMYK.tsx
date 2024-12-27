import { useContext } from "react";
import { AppContext } from "../../App.tsx";
import { Frame, ColorRange } from "../../StyledComponents.tsx";
import { sync_Input } from "../../Functions.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import {
  inputChanged,
  HSLtoHSV,
  RGBtoHexa,
  CMYKtoRGB,
  RGBtoHSL,
} from "../../features/colorCode/colorCodeSlice.ts";

const CMYK = () => {
  const dispatch = useAppDispatch();
  const colorCodes = useAppSelector((state) => state.colorCode);
  const { setAside, textColor, rangeBG } = useContext(AppContext);

  const CMYK_inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sync_Input(e, setAside);

    switch (true) {
      case e.target.className.includes("input_C"):
        dispatch(inputChanged({ type: "C", value: +e.target.value }));
        break;

      case e.target.className.includes("input_M"):
        dispatch(inputChanged({ type: "M", value: +e.target.value }));
        break;

      case e.target.className.includes("input_Y"):
        dispatch(inputChanged({ type: "Y", value: +e.target.value }));
        break;

      case e.target.className.includes("input_K"):
        dispatch(inputChanged({ type: "K", value: +e.target.value }));
    }

    dispatch(CMYKtoRGB());
    dispatch(RGBtoHexa());
    dispatch(RGBtoHSL());
    dispatch(HSLtoHSV());
  };

  const CCarray = [colorCodes.C, colorCodes.M, colorCodes.Y, colorCodes.K];

  return (
    <Frame textcolor={textColor ? 1 : 0}>
      <h4>CMYK</h4>
      {["C", "M", "Y", "K"].map((elm: string, key: number) => {
        return (
          <ColorRange bg={elm} rangebg={rangeBG} key={key}>
            <label>{elm}:</label>
            <div className="range">
              <input
                className={`input_${elm}`}
                type="range"
                min="0"
                max="100"
                onChange={(e) => {
                  CMYK_inputChange(e);
                }}
                value={Math.round(CCarray[key])}
              />
            </div>

            <input
              type="number"
              className={`input_${elm}`}
              min="0"
              max="100"
              step="1"
              onChange={(e) => {
                CMYK_inputChange(e);
              }}
              value={Math.round(CCarray[key])}
            />
          </ColorRange>
        );
      })}
    </Frame>
  );
};

export default CMYK;
