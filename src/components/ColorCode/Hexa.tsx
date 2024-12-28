import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../../App.tsx";
import { Frame } from "../../StyledComponents.ts";

const Hexa = () => {
  const { ColorCodes, dispatch, textColor } = useContext(AppContext);
  const [validHexaCode, setValidHexaCode] = useState<boolean>(true);
  const Hexa_Ref: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const Hexa_inputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target: HTMLInputElement = e.target as HTMLInputElement;

    if (target.value.match(/^#([a-fA-F0-9]){6}$/)) {
      setValidHexaCode(true);
      dispatch({ type: "inputHexaChanged", payload: target.value });
      dispatch({ type: "HexaToRGB" });
      dispatch({ type: "RGBtoCMYK" });
      dispatch({ type: "RGBtoHSL" });
      dispatch({ type: "HSLtoHSV" });
    } else {
      setValidHexaCode(false);
    }
  };

  useEffect(() => {
    Hexa_Ref.current!.value = ColorCodes.Hexa;
  }, [ColorCodes.Hexa]);

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
