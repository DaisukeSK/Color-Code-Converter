import { actionType, CCs, rangeBGType } from "./type";

///////////////////////////// input range background /////////////////////////////
const SandLforSv = (Sv: number, ob: CCs) => {
  // Function to get bgcolor of Sv range input
  const L: number = 100 * ((ob.V / 100) * (1 - Sv / 100 / 2));
  let S: number;
  S =
    L == 0 || L == 100
      ? 0
      : 100 * ((ob.V / 100 - L / 100) / Math.min(L / 100, 1 - L / 100));
  return [S, L];
};

const SandLforV = (V: number, ob: CCs) => {
  // Function to get bgcolor of V range input
  const L: number = 100 * ((V / 100) * (1 - ob.VS / 100 / 2));
  let S: number;
  S =
    L == 0 || L == 100
      ? 0
      : 100 * ((V / 100 - L / 100) / Math.min(L / 100, 1 - L / 100));
  return [S, L];
};

const CMYKbgColor = (c: number, m: number, y: number, k: number) => {
  return `rgb(${Math.round(255 * (1 - c / 100) * (1 - k / 100))},${Math.round(
    255 * (1 - m / 100) * (1 - k / 100)
  )},${Math.round(255 * (1 - y / 100) * (1 - k / 100))})`;
};

export const inputRangeBG = (
  //Main function
  ColorCodes: CCs,
  setRangeBG: (Rbg: rangeBGType) => void
): void => {
  const LS_left: string = `hsl(0,0%,${Math.round(ColorCodes.L)}%)`;
  const LS_right: string = `hsl(${Math.round(ColorCodes.H)},100%,${Math.round(
    ColorCodes.L
  )}%)`;
  const LS_bg: string = `linear-gradient(90deg, ${LS_left},${LS_right})`;

  const L_middle: string = `hsl(${Math.round(ColorCodes.H)},${Math.round(
    ColorCodes.LS
  )}%,50%)`;
  const L_bg: string = `linear-gradient(90deg, hsl(0,0%,0%), ${L_middle}, hsl(0,0%,100%))`;

  // Sv
  const VS_left: string = `hsl(0,${Math.round(
    SandLforSv(0, ColorCodes)[0]
  )}%,${Math.round(SandLforSv(0, ColorCodes)[1])}%)`;
  const VS_Right: string = `hsl(${Math.round(ColorCodes.H)},${Math.round(
    SandLforSv(100, ColorCodes)[0]
  )}%,${Math.round(SandLforSv(100, ColorCodes)[1])}%)`;

  const VS_bg: string = `linear-gradient(90deg, ${VS_left}, ${VS_Right})`;

  // V
  const V_left: string = `hsl(0,${Math.round(
    SandLforV(0, ColorCodes)[0]
  )}%,${Math.round(SandLforV(0, ColorCodes)[1])}%)`;
  const V_Right: string = `hsl(${Math.round(ColorCodes.H)},${Math.round(
    SandLforV(100, ColorCodes)[0]
  )}%,${Math.round(SandLforV(100, ColorCodes)[1])}%)`;

  const V_bg: string = `linear-gradient(90deg, ${V_left}, ${V_Right})`;

  // RGB
  const R_left: string = `rgb(0,${Math.round(ColorCodes.G)},${Math.round(
    ColorCodes.B
  )})`;
  const R_right: string = `rgb(255,${Math.round(ColorCodes.G)},${Math.round(
    ColorCodes.B
  )})`;
  const R_bg: string = `linear-gradient(90deg, ${R_left}, ${R_right})`;

  const G_left: string = `rgb(${Math.round(ColorCodes.R)},0,${Math.round(
    ColorCodes.B
  )})`;
  const G_right: string = `rgb(${Math.round(ColorCodes.R)},255,${Math.round(
    ColorCodes.B
  )})`;
  const G_bg: string = `linear-gradient(90deg, ${G_left}, ${G_right})`;

  const B_left: string = `rgb(${Math.round(ColorCodes.R)},${Math.round(
    ColorCodes.G
  )},0)`;
  const B_right: string = `rgb(${Math.round(ColorCodes.R)},${Math.round(
    ColorCodes.G
  )},255)`;
  const B_bg: string = `linear-gradient(90deg, ${B_left}, ${B_right})`;

  // CMYK
  const C_left: string = CMYKbgColor(
    0,
    ColorCodes.M,
    ColorCodes.Y,
    ColorCodes.K
  );
  const C_right: string = CMYKbgColor(
    100,
    ColorCodes.M,
    ColorCodes.Y,
    ColorCodes.K
  );

  const C_bg: string = `linear-gradient(90deg, ${C_left}, ${C_right})`;

  const M_left: string = CMYKbgColor(
    ColorCodes.C,
    0,
    ColorCodes.Y,
    ColorCodes.K
  );
  const M_right: string = CMYKbgColor(
    ColorCodes.C,
    100,
    ColorCodes.Y,
    ColorCodes.K
  );

  const M_bg: string = `linear-gradient(90deg, ${M_left}, ${M_right})`;

  const Y_left: string = CMYKbgColor(
    ColorCodes.C,
    ColorCodes.M,
    0,
    ColorCodes.K
  );
  const Y_right: string = CMYKbgColor(
    ColorCodes.C,
    ColorCodes.M,
    100,
    ColorCodes.K
  );

  const Y_bg: string = `linear-gradient(90deg, ${Y_left}, ${Y_right})`;

  const K_left: string = CMYKbgColor(
    ColorCodes.C,
    ColorCodes.M,
    ColorCodes.Y,
    0
  );
  const K_right: string = CMYKbgColor(
    ColorCodes.C,
    ColorCodes.M,
    ColorCodes.Y,
    100
  );

  const K_bg: string = `linear-gradient(90deg, ${K_left}, ${K_right})`;

  setRangeBG({
    LS: LS_bg,
    L: L_bg,
    VS: VS_bg,
    V: V_bg,
    R: R_bg,
    B: B_bg,
    G: G_bg,
    C: C_bg,
    M: M_bg,
    Y: Y_bg,
    K: K_bg,
  });
};

export const reducer = (state: CCs, action: actionType): CCs => {
  switch (true) {
    case action.type == "inputChanged" && action.payload.type == "H":
      return { ...state, H: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "LS":
      return { ...state, LS: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "L":
      return { ...state, L: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "VS":
      return { ...state, VS: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "V":
      return { ...state, V: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "R":
      return { ...state, R: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "G":
      return { ...state, G: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "B":
      return { ...state, B: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "C":
      return { ...state, C: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "M":
      return { ...state, M: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "Y":
      return { ...state, Y: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "K":
      return { ...state, K: action.payload.value };

    case action.type == "inputChanged" && action.payload.type == "opacity":
      return { ...state, opacity: action.payload.value };

    case action.type == "inputHexaChanged":
      return { ...state, Hexa: action.payload };

    case action.type == "HSLtoHSV":
      const V: number =
        100 *
        (state.L / 100 +
          (state.LS / 100) * Math.min(1 - state.L / 100, state.L / 100));
      const VS = V == 0 ? 0 : 200 * (1 - state.L / V);
      return { ...state, VS: VS, V: V };

    case action.type == "HSVtoHSL":
      const L2: number = 100 * ((state.V / 100) * (1 - state.VS / 100 / 2));

      let LS: number =
        L2 == 0 || L2 == 100
          ? 0
          : 100 *
            ((state.V / 100 - L2 / 100) / Math.min(L2 / 100, 1 - L2 / 100));

      return { ...state, LS: LS, L: L2 };

    case action.type == "HSLtoRGB":
      let L, H, fx, r, g, b: number;

      L = state.L < 50 ? state.L : 100 - state.L;
      const max: number = 2.55 * (state.L + (L * state.LS) / 100);
      const min: number = 2.55 * (state.L - (L * state.LS) / 100);

      if (0 <= state.H && state.H < 60) {
        H = state.H;
        fx = (H * (max - min)) / 60 + min;
        r = max;
        g = fx;
        b = min;
      } else if (60 <= state.H && state.H < 120) {
        H = 120 - state.H;
        fx = (H * (max - min)) / 60 + min;
        r = fx;
        g = max;
        b = min;
      } else if (120 <= state.H && state.H < 180) {
        H = state.H - 120;
        fx = (H * (max - min)) / 60 + min;
        r = min;
        g = max;
        b = fx;
      } else if (180 <= state.H && state.H < 240) {
        H = 240 - state.H;
        fx = (H * (max - min)) / 60 + min;
        r = min;
        g = fx;
        b = max;
      } else if (240 <= state.H && state.H < 300) {
        H = state.H - 240;
        fx = (H * (max - min)) / 60 + min;
        r = fx;
        g = min;
        b = max;
      } else if (300 <= state.H && state.H < 360) {
        H = 360 - state.H;
        fx = (H * (max - min)) / 60 + min;
        r = max;
        g = min;
        b = fx;
      }

      return { ...state, R: r!, G: g!, B: b! };

    case action.type == "RGBtoHexa":
      let rgb: Array<number> = [
        Math.round(state.R),
        Math.round(state.G),
        Math.round(state.B),
      ];
      let hexa: string = "#";

      rgb.forEach((elm) => {
        let quotient, remainder;
        let a = elm;
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
        let code = String(arr[1]) + arr[0];
        arr.length == 0 && (code = "00"); // it means a=0
        hexa += code;
      });

      return { ...state, Hexa: hexa };

    case action.type == "RGBtoCMYK":
      // Using Math.round to avoid problem mentioned on the top of code.  ??

      const rr: number = Math.round(state.R) / 255;
      const gg: number = Math.round(state.G) / 255;
      const bb: number = Math.round(state.B) / 255;

      let K: number = 1 - Math.max(rr, gg, bb);
      let C: number = ((1 - rr - K) * 100) / (1 - K);
      let M: number = ((1 - gg - K) * 100) / (1 - K);
      let Y: number = ((1 - bb - K) * 100) / (1 - K);

      !K ? (K = 0) : null;
      !C ? (C = 0) : null;
      !M ? (M = 0) : null;
      !Y ? (Y = 0) : null;

      return { ...state, C: C, M: M, Y: Y, K: K * 100 };

    case action.type == "HexaToRGB":
      let newArray = [];
      let a;

      for (let key in state.Hexa.split("")) {
        switch (state.Hexa[key].toUpperCase()) {
          case "A":
            a = 10;
            break;
          case "B":
            a = 11;
            break;
          case "C":
            a = 12;
            break;
          case "D":
            a = 13;
            break;
          case "E":
            a = 14;
            break;
          case "F":
            a = 15;
            break;
          default:
            a = state.Hexa[key];
        }

        newArray.push(+a);
      }

      return {
        ...state,
        R: newArray[1] * 16 + newArray[2],
        G: newArray[3] * 16 + newArray[4],
        B: newArray[5] * 16 + newArray[6],
      };

    case action.type == "RGBtoHSL":
      const R: number = state.R / 255;
      const G: number = state.G / 255;
      const B: number = state.B / 255;

      const max2: number = Math.max(R, G, B);
      const min2: number = Math.min(R, G, B);
      const c: number = max2 - min2;
      let H2: number;
      if (c == 0) {
        H2 = state.H;
        //Putting current hue value instead of 0 to avoid sudden color change
      } else if (max2 == R) {
        H2 = (((G - B) / c) % 6) * 60;
      } else if (max2 == G) {
        H2 = ((B - R) / c + 2) * 60;
      } else if (max2 == B) {
        H2 = ((R - G) / c + 4) * 60;
      }

      H2! < 0 && (H2! += 360);

      return {
        ...state,
        H: H2!,
        LS:
          c == 0
            ? 0
            : (c * 100) /
              (1 - Math.abs((2 * (((max2 + min2) * 100) / 2)) / 100 - 1)),
        L: ((max2 + min2) * 100) / 2,
      };

    case action.type == "CMYKtoRGB":
      const R2: number = 255 * (1 - state.C / 100) * (1 - state.K / 100);
      const G2: number = 255 * (1 - state.M / 100) * (1 - state.K / 100);
      const B2: number = 255 * (1 - state.Y / 100) * (1 - state.K / 100);
      return { ...state, R: R2, G: G2, B: B2 };

    case action.type == "manipulatingPointer":
      return {
        ...state,
        manipulatingPointer: action.payload,
      };

    default:
      return { ...state };
  }
};
