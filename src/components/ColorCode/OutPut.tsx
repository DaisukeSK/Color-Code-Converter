import { useContext, Fragment } from "react";
import { AppContext } from "../../App.tsx";
import { OutputFrame, OpacityColorRange } from "../../StyledComponents.js";

const OutPut = () => {
  const { ColorCodes, dispatch, textColor, builtInColor } =
    useContext(AppContext);

  const OpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "inputChanged",
      payload: { type: "opacity", value: +e.target.value },
    });
  };

  const copyCode = (e: React.MouseEvent<HTMLDivElement>) => {
    const target: HTMLDivElement = e.target as HTMLDivElement;
    const inputElement: HTMLInputElement = target.closest("div")!
      .previousElementSibling as HTMLInputElement;
    inputElement.select();
    document.execCommand("copy");
  };

  const updateOutput = (type: string) => {
    let h: number = Math.round(ColorCodes.H);
    let sl: number = Math.round(ColorCodes.LS);
    let l: number = Math.round(ColorCodes.L);
    let sv: number = Math.round(ColorCodes.VS);
    let v: number = Math.round(ColorCodes.V);

    sl == 0 || l == 0 || l == 100 ? (h = 0) : null;

    if (l == 0 || l == 100) {
      sl = 0;
      sv = 0;
    }

    let r: number = Math.round(ColorCodes.R);
    let g: number = Math.round(ColorCodes.G);
    let b: number = Math.round(ColorCodes.B);

    let c, m, y: number;
    let k: number = Math.round(ColorCodes.K);

    if (k == 100) {
      c = 0;
      m = 0;
      y = 0;
    } else {
      c = Math.round(ColorCodes.C);
      m = Math.round(ColorCodes.M);
      y = Math.round(ColorCodes.Y);
    }

    c == 100 && m == 100 && y == 100 ? (k = 0) : null;

    if (ColorCodes.opacity == 1) {
      switch (type) {
        case "HSL":
          return `hsl(${h}, ${sl}%, ${l}%)`;
        case "HSV":
          return `hsv(${h}, ${sv}%, ${v}%)`;
        case "Hexa":
          return `${ColorCodes.Hexa.toUpperCase()}`;
        case "RGB":
          return `rgb(${r}, ${g}, ${b})`;
        case "CMYK":
          return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
      }
    } else {
      let hexa: string = "";
      let a: number = Math.round(ColorCodes.opacity * 255);
      let quotient, remainder;
      let arr = [];

      while (a !== 0) {
        quotient = Math.floor(a / 16);
        remainder = a % 16;

        switch (remainder) {
          case 10:
            remainder = "A";
            break;
          case 11:
            remainder = "B";
            break;
          case 12:
            remainder = "C";
            break;
          case 13:
            remainder = "D";
            break;
          case 14:
            remainder = "E";
            break;
          case 15:
            remainder = "F";
        }
        arr.push(remainder);
        a = quotient;
        a == 0 && arr.length == 1 ? arr.push(a) : null;
      }

      hexa = String(arr[1]) + arr[0];
      hexa == "undefinedundefined" && (hexa = "00");

      switch (type) {
        case "HSL":
          return `hsla(${h}, ${sl}%, ${l}%, ${ColorCodes.opacity})`;
        case "HSV":
          return `hsva(${h}, ${sv}%, ${v}%, ${ColorCodes.opacity})`;
        case "Hexa":
          return `${ColorCodes.Hexa.toUpperCase()}${hexa}`;
        case "RGB":
          return `rgba(${r}, ${g}, ${b}, ${ColorCodes.opacity})`;
        case "CMYK":
          return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
      }
    }
  };

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
                <input type="text" readOnly value={updateOutput(elm)} />
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
