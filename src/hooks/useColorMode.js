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

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeProvider = function ({ children }) {
  const [mode, setMode] = useState(initialTheme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      })
    , [mode]);

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    setMode(event.matches ? "dark" : "light");
  });

  function setColorMode(theme) {
    setMode(theme === "system" ? getSystemTheme() : theme);
    setPreferedTheme(theme);
  }

  const data = {
    mode, setColorMode
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