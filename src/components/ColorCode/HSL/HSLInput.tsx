import { useContext } from "react";
import { AppContext } from "../../../App.tsx";
import { HSLColorRange } from "../../../StyledComponents.ts";

const HSLInput = () => {
  const { ColorCodes, dispatch, rangeBG, HSLtoggle } = useContext(AppContext);

  const HSL_inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "inputChanged",
      payload: { type: e.target.className, value: +e.target.value },
    });

    if (e.target.className == "LS" || e.target.className == "L") {
      dispatch({ type: "HSLtoHSV" });
    } else if (e.target.className == "VS" || e.target.className == "V") {
      dispatch({ type: "HSVtoHSL" });
    }

    dispatch({ type: "HSLtoRGB" });
    dispatch({ type: "RGBtoHexa" });
    dispatch({ type: "RGBtoCMYK" });
  };

  const CCarray = [ColorCodes.LS, ColorCodes.L, ColorCodes.VS, ColorCodes.V];

  return (
    <>
      <HSLColorRange toggle={true}>
        <label>H:</label>
        <div className="range">
          <input
            className="H"
            type="range"
            min="0"
            max="359"
            onChange={(e) => {
              HSL_inputChange(e);
            }}
            value={Math.round(ColorCodes.H)}
          />
        </div>
        <input type="number" value={Math.round(ColorCodes.H)} />
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
                className={elm}
                type="range"
                min="0"
                max="100"
                onChange={(e) => {
                  HSL_inputChange(e);
                }}
                value={Math.round(CCarray[key])}
              />
            </div>

            <input type="number" value={Math.round(CCarray[key])} />
          </HSLColorRange>
        );
      })}
    </>
  );
};

export default HSLInput;
