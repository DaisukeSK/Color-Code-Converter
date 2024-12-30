import { useContext } from "react";
import { AppContext, builtInColors } from "../App.tsx";
import { Aside } from "../StyledComponents.ts";
import logo from "../../public/logo_letter.svg";
import { Button, Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const SideBar = () => {
  const { dispatch, aside, setAside } = useContext(AppContext);

  const LiClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target: HTMLLIElement = e.target as HTMLLIElement;

    dispatch({
      type: "inputChanged",
      payload: { type: "opacity", value: 1 },
    });

    dispatch({
      type: "inputHexaChanged",
      payload: "#" + target.closest("button")!.id.replace("h", ""),
    });

    dispatch({ type: "HexaToRGB" });
    dispatch({ type: "RGBtoCMYK" });
    dispatch({ type: "RGBtoHSL" });
    dispatch({ type: "HSLtoHSV" });
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
        <div>
          <IconButton href="https://github.com/DaisukeSK" target="_blank">
            <GitHubIcon
              fontSize="large"
              sx={{
                fill: "#ffffff33",
                "&:hover": {
                  fill: "#ffffff77",
                },
              }}
            />
          </IconButton>

          <IconButton
            href="https://www.linkedin.com/in/daisuke-seki-670202261"
            target="_blank"
          >
            <LinkedInIcon
              fontSize="large"
              sx={{
                fill: "#ffffff33",
                "&:hover": {
                  fill: "#ffffff77",
                },
              }}
            />
          </IconButton>
        </div>
      </div>

      <ul>
        {Object.keys(builtInColors).map((val: string, key: number) => {
          return (
            <Button
              key={key}
              id={"h" + builtInColors[val]["hexa"].replace("#", "")}
              onClick={(e: any) => LiClick(e)}
              variant="contained"
              sx={{
                width: "150px",
                height: "60px",
                margin: "7px 0",
                lineHeight: 1,
                backgroundColor: builtInColors[val]["hexa"],
                color: builtInColors[val].textColor
                  ? builtInColors[val].textColor
                  : "#ffffffaa",
                border: `3px solid transparent`,
                "&:hover": {
                  border: `3px solid ${
                    builtInColors[val].textColor
                      ? builtInColors[val].textColor
                      : "#ffffff77"
                  }`,
                },
              }}
            >
              <Box>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize:
                      val == "LightGoldenRodYellow"
                        ? "0.6rem"
                        : val == "MediumAquaMarine" ||
                          val == "MediumSpringGreen"
                        ? "0.75rem"
                        : val == "BlanchedAlmond" ||
                          val == "CornflowerBlue" ||
                          val == "MediumTurquoise" ||
                          val == "MediumVioletRed" ||
                          val == "MediumSlateBlue"
                        ? "0.8rem"
                        : "0.875rem",
                  }}
                >
                  {val}
                </div>
                <div>{builtInColors[val]["hexa"]}</div>
              </Box>
            </Button>
          );
        })}
      </ul>
    </Aside>
  );
};
