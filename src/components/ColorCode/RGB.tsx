import { useContext } from "react";
import { AppContext } from "../../App.tsx";
import { Frame, ColorRange } from "../../StyledComponents.ts";

const RGB = () => {
  const { ColorCodes, dispatch, textColor, rangeBG } = useContext(AppContext);

  const RGB_inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "inputChanged",
      payload: { type: e.target.className, value: +e.target.value },
    });
    dispatch({ type: "RGBtoHSL" });
    dispatch({ type: "HSLtoHSV" });
    dispatch({ type: "RGBtoHexa" });
    dispatch({ type: "RGBtoCMYK" });
  };

  const CCarray = [ColorCodes.R, ColorCodes.G, ColorCodes.B];

  return (
    <Frame textcolor={textColor ? 1 : 0}>
      <h4>RGB</h4>

      {["R", "G", "B"].map((elm: string, key: number) => {
        return (
          <ColorRange bg={elm} rangebg={rangeBG} key={key}>
            <label>{elm}:</label>

            <div className="range">
              <input
                className={elm}
                type="range"
                min="0"
                max="255"
                onChange={(e) => {
                  RGB_inputChange(e);
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

export default RGB;
