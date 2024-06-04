import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getPreferedTheme, getSystemTheme, setPreferedTheme } from "../utils/themeTools";
import CssBaseline from "@mui/material/CssBaseline";

const preferedTheme = getPreferedTheme();
let initialTheme;
if ((preferedTheme && preferedTheme === "system") || !Boolean(preferedTheme)) {
  initialTheme = getSystemTheme();
} else {
  initialTheme = preferedTheme;
}

const ColorModeContext = createContext();
const colorModes = ["dark", "system", "light"]

export const ColorModeProvider = function ({ children }) {
  const [colorMode, setColorMode] = useState(initialTheme);
  
  const mode = colorMode === "system" ? getSystemTheme() : colorMode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark" ? {
            appBar: "#3c3c3c",
            showMoreButton: "#1769aa"
          } : {
            appBar: "#f5f5f5",
            showMoreButton: "#1769aa"
          })
        }
      })
    , [mode]);

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    setColorMode(event.matches ? "dark" : "light");
  });

  function changeColorMode(theme) {
    if (colorModes.includes(theme)) {
      setColorMode(theme);
      setPreferedTheme(theme);
    }
  }

  const data = {
    colorMode, changeColorMode, colorModes
  }

  return (
    <ColorModeContext.Provider value={data}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = function () {
  return useContext(ColorModeContext);
}