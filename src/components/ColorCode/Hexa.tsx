import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../../App.tsx";
import { Frame } from "../../StyledComponents.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import {
  inputHexaChanged,
  RGBtoCMYK,
  RGBtoHSL,
  HSLtoHSV,
  HexaToRGB,
} from "../../features/colorCode/colorCodeSlice.ts";

const Hexa = () => {
  const dispatch = useAppDispatch();
  const colorCodes = useAppSelector((state) => state.colorCode);
  const { textColor } = useContext(AppContext);
  const [validHexaCode, setValidHexaCode] = useState<boolean>(true);
  const Hexa_Ref: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const Hexa_inputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log("onInput");
    const target: HTMLInputElement = e.target as HTMLInputElement;

    if (target.value.match(/^#([a-fA-F0-9]){6}$/)) {
      setValidHexaCode(true);

      dispatch(inputHexaChanged(target.value));
      dispatch(HexaToRGB());
      dispatch(RGBtoCMYK());
      dispatch(RGBtoHSL());
      dispatch(HSLtoHSV());
    } else {
      setValidHexaCode(false);
    }
  };

  useEffect(() => {
    Hexa_Ref.current!.value = colorCodes.Hexa;
  }, [colorCodes.Hexa]);

  return (
    <Frame className="hexa" textcolor={textColor ? 1 : 0}>
      <h4>Hexa</h4>
      <input
        className="textInput"
        type="text"
        onInput={(e) => Hexa_inputChange(e)}
        ref={Hexa_Ref}
      />
      {!validHexaCode && <p>*Incorrect input format</p>}
    </Frame>
  );
};

export default Hexa;
