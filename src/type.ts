export type builtInColorsType = {
  [key: string]: { hexa: string; textColor?: string };
};

export type outputType = {
  HSL: string;
  HSV: string;
  Hexa: string;
  RGB: string;
  CMYK: string;
};

export type ppType = {
  HSL_top: string;
  HSL_left: string;
  HSV_top: string;
  HSV_left: string;
};

export type rangeBGType = {
  LS: string;
  L: string;
  VS: string;
  V: string;
  R: string;
  G: string;
  B: string;
  C: string;
  M: string;
  Y: string;
  K: string;
};

export type CCs = {
  H: number;
  LS: number;
  L: number;
  VS: number;
  V: number;
  Hexa: string;
  R: number;
  G: number;
  B: number;
  C: number;
  M: number;
  Y: number;
  K: number;
  opacity: number;
  manipulatingPointer: boolean;
};

export type Context = {
  ColorCodes: CCs;
  dispatch: (cc: actionType) => void;
  textColor: boolean;
  rangeBG: rangeBGType;
  builtInColor: Array<string | null>;
  aside: boolean;
  pointerPosition: ppType;
  setAside: (aside: boolean) => void;
  setPointerPosition: (pp: ppType) => void;
  HSLtoggle: boolean;
  setHSLtoggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export type actionType =
  | {
      type: "CMYKtoRGB";
    }
  | {
      type: "RGBtoHSL";
    }
  | {
      type: "HexaToRGB";
    }
  | {
      type: "RGBtoCMYK";
    }
  | {
      type: "RGBtoHexa";
    }
  | {
      type: "HSLtoRGB";
    }
  | {
      type: "HSLtoHSV";
    }
  | {
      type: "HSVtoHSL";
    }
  | {
      type: "inputChanged";
      payload: { type: string; value: number };
    }
  | {
      type: "inputHexaChanged";
      payload: string;
    }
  | {
      type: "manipulatingPointer";
      payload: boolean;
    };
