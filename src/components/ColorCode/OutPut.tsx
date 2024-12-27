import { useContext, Fragment } from "react";
import { AppContext } from "../../App.tsx";
import { OutputFrame, OpacityColorRange } from "../../StyledComponents.js";

const OutPut = () => {
  const { ColorCodes, dispatch, textColor, builtInColor, output } =
    useContext(AppContext);

  const OpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "opacity", payload: +e.target.value });
  };

  const copyCode = (e: React.MouseEvent<HTMLDivElement>) => {
    const target: HTMLDivElement = e.target as HTMLDivElement;
    const inputElement: HTMLInputElement = target.closest("div")!
      .previousElementSibling as HTMLInputElement;
    inputElement.select();
    document.execCommand("copy");
  };

  const outPutArray = [
    output.HSL,
    output.HSV,
    output.Hexa,
    output.RGB,
    output.CMYK,
  ];

  return (
    <OutputFrame textcolor={textColor ? 1 : 0} bultin={builtInColor}>
      <div className="colorName">
        <h4>Color Name:</h4>
        <span>{builtInColor[0]}</span>
        <div></div>
      </div>

      <hr />

      <div className="grid">
        {["HSL", "HSV", "Hexa", "RGB", "CMYK"].map(
          (elm: string, key: number) => {
            return (
              <Fragment key={key}>
                <h4 key={key}>{elm}:</h4>
                <input type="text" readOnly value={outPutArray[key]} />
                <div className="copyBox" onClick={(e) => copyCode(e)}>
                  <span></span>
                  <span></span>
                </div>
              </Fragment>
            );
          }
        )}
      </div>

      <hr />

      <OpacityColorRange>
        <label>Opacity:</label>
        <div className="range">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => OpacityChange(e)}
            value={ColorCodes.opacity}
          />
        </div>
        <input
          type="number"
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => OpacityChange(e)}
          value={ColorCodes.opacity}
        />
      </OpacityColorRange>
    </OutputFrame>
  );
};

export default OutPut;
