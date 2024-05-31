import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import OfflineAlert from "./components/OfflineAlert";
import useTitle from "./hooks/useTitle";
import "./stylesheets/App.css";
import Keyboard from "./components/Keyboard";
import FloatingKeyboardButton from "./components/FloatingKeyboardButton"
import TopBar from "./components/layout/TopBar";
import Menu from "./components/layout/Menu";
import { Grid } from "@mui/material";
import { useColorMode } from "./hooks/useColorMode";

function App() {
  const { t } = useTranslation("app");
  const { setColorMode } = useColorMode();
  useTitle(t("documentTitle"))
  setTimeout(() => {
    setColorMode("system");
  }, 2000)
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <Menu />
        </Grid>
        <Grid item xs={12} md={9} lg={8}>
          <Outlet />
        </Grid>
      </Grid>
      <OfflineAlert />
      <Keyboard />
      <FloatingKeyboardButton />
    </>
  );
}

export default App;
