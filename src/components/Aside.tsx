import { useContext } from "react";
import { AppContext, builtInColors } from "../App.tsx";
import { Aside } from "../StyledComponents.tsx";
import logo from "../../public/logo_letter.svg";
import Github from "../SVG/Github.tsx";
import LinkedIn from "../SVG/LinkedIn.tsx";
import { useAppDispatch } from "../hooks.ts";
import {
  inputChanged,
  inputHexaChanged,
  HexaToRGB,
  RGBtoCMYK,
  RGBtoHSL,
  HSLtoHSV,
} from "../features/colorCode/colorCodeSlice.ts";

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const { aside, setAside } = useContext(AppContext);

  const LiClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target: HTMLLIElement = e.target as HTMLLIElement;

    dispatch(inputChanged({ type: "opacity", value: 1 }));
    dispatch(inputHexaChanged("#" + target.closest("li")!.id.replace("h", "")));
    dispatch(HexaToRGB());
    dispatch(RGBtoCMYK());
    dispatch(RGBtoHSL());
    dispatch(HSLtoHSV());
  };

  return (
    <Aside aside={aside ? 1 : 0}>
      <div className="top">
        <svg
          className="close"
          strokeWidth="2"
          width="20"
          height="20"
          fill="none"
          onClick={() => {
            setAside(false);
          }}
        >
          <rect x="1" y="1" rx="5" ry="5" width="18" height="18" />
          <path d="M5 5 l10 10" />
          <path d="M15 5 l-10 10" />
        </svg>

        <img src={logo} />
        <hr />
        <div className="presentedBy">Presented by DaisukeSK</div>
        <div className="links">
          <a href="https://github.com/DaisukeSK" target="_blank">
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/daisuke-seki-670202261"
            target="_blank"
          >
            <LinkedIn />
          </a>
        </div>
      </div>

      <ul>
        {Object.keys(builtInColors).map((val: string, key: number) => {
          return (
            <li
              key={key}
              id={"h" + builtInColors[val]["hexa"].replace("#", "")}
              onClick={(e) => LiClick(e)}
              style={{
                backgroundColor: builtInColors[val]["hexa"],
                color: builtInColors[val].letterColor
                  ? builtInColors[val]["letterColor"]
                  : "hsla(0, 0%, 100%, 0.7)",
              }}
            >
              {val}
              <br />
              {builtInColors[val]["hexa"]}
            </li>
          );
        })}
      </ul>
    </Aside>
  );
};
