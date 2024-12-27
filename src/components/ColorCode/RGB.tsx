import { useContext } from "react";
import { AppContext } from "../../App.tsx";
import { Frame, ColorRange } from "../../StyledComponents.tsx";
import { sync_Input } from "../../Functions.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import {
  inputChanged,
  HSLtoHSV,
  RGBtoHexa,
  RGBtoCMYK,
  RGBtoHSL,
} from "../../features/colorCode/colorCodeSlice.ts";

const RGB = () => {
  const dispatch = useAppDispatch();
  const colorCodes = useAppSelector((state) => state.colorCode);
  const { setAside, textColor, rangeBG } = useContext(AppContext);

  const RGB_inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sync_Input(e, setAside);

    switch (true) {
      case e.target.className.includes("input_R"):
        dispatch(inputChanged({ type: "R", value: +e.target.value }));
        break;
      case e.target.className.includes("input_G"):
        dispatch(inputChanged({ type: "G", value: +e.target.value }));
        break;
      case e.target.className.includes("input_B"):
        dispatch(inputChanged({ type: "B", value: +e.target.value }));
        break;
    }

    dispatch(RGBtoHSL());
    dispatch(HSLtoHSV());
    dispatch(RGBtoHexa());
    dispatch(RGBtoCMYK());
  };

  const CCarray = [colorCodes.R, colorCodes.G, colorCodes.B];

  return (
    <Frame textcolor={textColor ? 1 : 0}>
      <h4>RGB</h4>

      {["R", "G", "B"].map((elm: string, key: number) => {
        return (
          <ColorRange bg={elm} rangebg={rangeBG} key={key}>
            <label>{elm}:</label>

            <div className="range">
              <input
                className={`input_${elm}`}
                type="range"
                min="0"
                max="255"
                onChange={(e) => {
                  RGB_inputChange(e);
                }}
                value={Math.round(CCarray[key])}
              />
            </div>

            <input
              type="number"
              className={`input_${elm}`}
              min="0"
              max="255"
              step="1"
              onChange={(e) => {
                RGB_inputChange(e);
              }}
              value={Math.round(CCarray[key])}
            />
          </ColorRange>
        );
      })}
    </Frame>
  );
};

export default RGB;
