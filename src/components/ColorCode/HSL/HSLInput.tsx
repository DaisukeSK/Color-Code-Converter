import { useContext } from "react";
import { AppContext } from "../../../App.tsx";
import { HSLColorRange } from "../../../StyledComponents.tsx";
import { sync_Input } from "../../../Functions.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks.ts";
import {
  inputChanged,
  HSLtoHSV,
  HSVtoHSL,
  HSLtoRGB,
  RGBtoHexa,
  RGBtoCMYK,
} from "../../../features/colorCode/colorCodeSlice.ts";

const HSLInput = () => {
  const dispatch = useAppDispatch();
  const colorCodes = useAppSelector((state) => state.colorCode);
  const { rangeBG, setAside, HSLtoggle } = useContext(AppContext);

  const HSL_inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    sync_Input(e, setAside);

    switch (true) {
      case e.target.className.includes("input_H"):
        dispatch(inputChanged({ type: "H", value: +e.target.value }));
        dispatch(HSLtoHSV());
        break;
      case e.target.className.includes("input_LS"):
        dispatch(inputChanged({ type: "LS", value: +e.target.value }));
        dispatch(HSLtoHSV());

        break;
      case e.target.className.includes("input_L"):
        dispatch(inputChanged({ type: "L", value: +e.target.value }));
        dispatch(HSLtoHSV());

        break;
      case e.target.className.includes("input_VS"):
        dispatch(inputChanged({ type: "VS", value: +e.target.value }));
        dispatch(HSVtoHSL());

        break;
      case e.target.className.includes("input_V"):
        dispatch(inputChanged({ type: "V", value: +e.target.value }));
        dispatch(HSVtoHSL());
    }

    dispatch(HSLtoRGB());
    dispatch(RGBtoHexa());
    dispatch(RGBtoCMYK());
  };

  const CCarray = [colorCodes.LS, colorCodes.L, colorCodes.VS, colorCodes.V];

  return (
    <>
      <HSLColorRange toggle={true}>
        <label>H:</label>
        <div className="range">
          <input
            className="input_H"
            type="range"
            min="0"
            max="359"
            onChange={(e) => {
              HSL_inputChange(e);
            }}
            value={Math.round(colorCodes.H)}
          />
        </div>
        <input
          type="number"
          className="input_H"
          min="0"
          max="359"
          step="1"
          onChange={(e) => {
            HSL_inputChange(e);
          }}
          value={Math.round(colorCodes.H)}
        />
      </HSLColorRange>

      {["LS", "L", "VS", "V"].map((elm: string, key: number) => {
        return (
          <HSLColorRange
            bg={elm}
            rangebg={rangeBG}
            toggle={key == 0 || key == 1 ? HSLtoggle : !HSLtoggle}
            key={key}
          >
            <label>{elm.split("")[elm.length - 1]}:</label>
            <div className="range">
              <input
                className={`input_${elm}`}
                type="range"
                min="0"
                max="100"
                onChange={(e) => {
                  HSL_inputChange(e);
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
                HSL_inputChange(e);
              }}
              value={Math.round(CCarray[key])}
            />
          </HSLColorRange>
        );
      })}
    </>
  );
};

export default HSLInput;
