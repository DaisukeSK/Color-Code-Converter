import { useContext } from "react";
import { AppContext } from "../../../App.tsx";
import { HSLColorRange } from "../../../StyledComponents.tsx";
import { sync_Input } from "../../../Functions.tsx";

const HSLInput = () => {
  const { ColorCodes, dispatch, rangeBG, setAside, HSLtoggle } =
    useContext(AppContext);

  const HSL_inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    sync_Input(e, setAside);

    switch (true) {
      case e.target.className.includes("input_H"):
        dispatch({ type: "H", payload: +e.target.value });
        dispatch({ type: "HSLtoHSV", payload: null });
        break;
      case e.target.className.includes("input_LS"):
        dispatch({ type: "LS", payload: +e.target.value });
        dispatch({ type: "HSLtoHSV", payload: null });
        break;
      case e.target.className.includes("input_L"):
        dispatch({ type: "L", payload: +e.target.value });
        dispatch({ type: "HSLtoHSV", payload: null });
        break;
      case e.target.className.includes("input_VS"):
        dispatch({ type: "VS", payload: +e.target.value });
        dispatch({ type: "HSVtoHSL", payload: null });
        break;
      case e.target.className.includes("input_V"):
        dispatch({ type: "V", payload: +e.target.value });
        dispatch({ type: "HSVtoHSL", payload: null });
    }

    dispatch({ type: "HSLtoRGB", payload: null });
    dispatch({ type: "RGBtoHexa", payload: null });
    dispatch({ type: "RGBtoCMYK", payload: null });
    dispatch({ type: "trigger", payload: true });
  };

  const CCarray = [ColorCodes.LS, ColorCodes.L, ColorCodes.VS, ColorCodes.V];

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
            value={Math.round(ColorCodes.H)}
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
          value={Math.round(ColorCodes.H)}
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
