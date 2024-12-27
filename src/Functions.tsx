import { builtInColorsType } from "./type";
import { rangeBGType } from "./type";
import { colorCodeType } from "./features/colorCode/colorCodeSlice";

///////////////////////////// input change /////////////////////////////
export const sync_Input = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAside: (aside: boolean) => void
): void => {
  setAside(false);
  const target: HTMLInputElement = e.target as HTMLInputElement;

  if (target.type == "range") {
    const NumInput = target.parentNode!.nextSibling as HTMLInputElement;
    NumInput!.value = target.value;
  } else {
    const RangeInput = target.previousSibling as HTMLDivElement;
    const range = RangeInput!.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    range!.value = target.value;
  }
};

///////////////////////////// BuiltIn color /////////////////////////////
export const check_Built_In_Color = (
  colorCodes: colorCodeType,
  builtInColors: builtInColorsType,
  setBuiltInColor: (bc: Array<string | null>) => void
): void => {
  setBuiltInColor(["--", null]);
  Object.keys(builtInColors).forEach((val: string) => {
    colorCodes.Hexa == builtInColors[val]["hexa"] &&
      setBuiltInColor(
        builtInColors[val]["hexa"] == "#00FFFF"
          ? ["Aqua/Cyan", builtInColors[val]["hexa"]]
          : [val, builtInColors[val]["hexa"]]
      );
  });
};

///////////////////////////// input range background /////////////////////////////
const SandLforSv = (Sv: number, ob: colorCodeType) => {
  // Function to get bgcolor of Sv range input
  const L: number = 100 * ((ob.V / 100) * (1 - Sv / 100 / 2));
  let S: number;
  S =
    L == 0 || L == 100
      ? 0
      : 100 * ((ob.V / 100 - L / 100) / Math.min(L / 100, 1 - L / 100));
  return [S, L];
};

const SandLforV = (V: number, ob: colorCodeType) => {
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
  colorCodes: colorCodeType,
  setRangeBG: (Rbg: rangeBGType) => void
): void => {
  //Main function

  const LS_left: string = `hsl(0,0%,${Math.round(colorCodes.L)}%)`;
  const LS_right: string = `hsl(${Math.round(colorCodes.H)},100%,${Math.round(
    colorCodes.L
  )}%)`;
  const LS_bg: string = `linear-gradient(90deg, ${LS_left},${LS_right})`;

  const L_middle: string = `hsl(${Math.round(colorCodes.H)},${Math.round(
    colorCodes.LS
  )}%,50%)`;
  const L_bg: string = `linear-gradient(90deg, hsl(0,0%,0%), ${L_middle}, hsl(0,0%,100%))`;

  // Sv
  const VS_left: string = `hsl(0,${Math.round(
    SandLforSv(0, colorCodes)[0]
  )}%,${Math.round(SandLforSv(0, colorCodes)[1])}%)`;
  const VS_Right: string = `hsl(${Math.round(colorCodes.H)},${Math.round(
    SandLforSv(100, colorCodes)[0]
  )}%,${Math.round(SandLforSv(100, colorCodes)[1])}%)`;

  const VS_bg: string = `linear-gradient(90deg, ${VS_left}, ${VS_Right})`;

  // V
  const V_left: string = `hsl(0,${Math.round(
    SandLforV(0, colorCodes)[0]
  )}%,${Math.round(SandLforV(0, colorCodes)[1])}%)`;
  const V_Right: string = `hsl(${Math.round(colorCodes.H)},${Math.round(
    SandLforV(100, colorCodes)[0]
  )}%,${Math.round(SandLforV(100, colorCodes)[1])}%)`;

  const V_bg: string = `linear-gradient(90deg, ${V_left}, ${V_Right})`;

  // RGB
  const R_left: string = `rgb(0,${Math.round(colorCodes.G)},${Math.round(
    colorCodes.B
  )})`;
  const R_right: string = `rgb(255,${Math.round(colorCodes.G)},${Math.round(
    colorCodes.B
  )})`;
  const R_bg: string = `linear-gradient(90deg, ${R_left}, ${R_right})`;

  const G_left: string = `rgb(${Math.round(colorCodes.R)},0,${Math.round(
    colorCodes.B
  )})`;
  const G_right: string = `rgb(${Math.round(colorCodes.R)},255,${Math.round(
    colorCodes.B
  )})`;
  const G_bg: string = `linear-gradient(90deg, ${G_left}, ${G_right})`;

  const B_left: string = `rgb(${Math.round(colorCodes.R)},${Math.round(
    colorCodes.G
  )},0)`;
  const B_right: string = `rgb(${Math.round(colorCodes.R)},${Math.round(
    colorCodes.G
  )},255)`;
  const B_bg: string = `linear-gradient(90deg, ${B_left}, ${B_right})`;

  // CMYK
  const C_left: string = CMYKbgColor(
    0,
    colorCodes.M,
    colorCodes.Y,
    colorCodes.K
  );
  const C_right: string = CMYKbgColor(
    100,
    colorCodes.M,
    colorCodes.Y,
    colorCodes.K
  );

  const C_bg: string = `linear-gradient(90deg, ${C_left}, ${C_right})`;

  const M_left: string = CMYKbgColor(
    colorCodes.C,
    0,
    colorCodes.Y,
    colorCodes.K
  );
  const M_right: string = CMYKbgColor(
    colorCodes.C,
    100,
    colorCodes.Y,
    colorCodes.K
  );

  const M_bg: string = `linear-gradient(90deg, ${M_left}, ${M_right})`;

  const Y_left: string = CMYKbgColor(
    colorCodes.C,
    colorCodes.M,
    0,
    colorCodes.K
  );
  const Y_right: string = CMYKbgColor(
    colorCodes.C,
    colorCodes.M,
    100,
    colorCodes.K
  );

  const Y_bg: string = `linear-gradient(90deg, ${Y_left}, ${Y_right})`;

  const K_left: string = CMYKbgColor(
    colorCodes.C,
    colorCodes.M,
    colorCodes.Y,
    0
  );
  const K_right: string = CMYKbgColor(
    colorCodes.C,
    colorCodes.M,
    colorCodes.Y,
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
