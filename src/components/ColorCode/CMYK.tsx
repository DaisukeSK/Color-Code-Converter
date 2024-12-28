import { useContext } from "react";
import { AppContext } from "../../App.tsx";
import { Frame, ColorRange } from "../../StyledComponents.ts";

const CMYK = () => {
  const { ColorCodes, dispatch, textColor, rangeBG } = useContext(AppContext);

  const CMYK_inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "inputChanged",
      payload: { type: e.target.className, value: +e.target.value },
    });
    dispatch({ type: "CMYKtoRGB" });
    dispatch({ type: "RGBtoHexa" });
    dispatch({ type: "RGBtoHSL" });
    dispatch({ type: "HSLtoHSV" });
  };

  const CCarray = [ColorCodes.C, ColorCodes.M, ColorCodes.Y, ColorCodes.K];

  return (
    <Frame textcolor={textColor ? 1 : 0}>
      <h4>CMYK</h4>
      {["C", "M", "Y", "K"].map((elm: string, key: number) => {
        return (
          <ColorRange bg={elm} rangebg={rangeBG} key={key}>
            <label>{elm}:</label>
            <div className="range">
              <input
                className={elm}
                type="range"
                min="0"
                max="100"
                onChange={(e) => {
                  CMYK_inputChange(e);
                }}
                value={Math.round(CCarray[key])}
              />
            </div>
            <input type="number" value={Math.round(CCarray[key])} />
          </ColorRange>
        );
      })}
    </Frame>
  );
};

export default CMYK;
