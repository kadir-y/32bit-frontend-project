import { Grid, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToggle } from "./hooks/useToggle"
import { useWindowSize } from "./hooks/useWindowSize";
import OfflineDialog from "./components/OfflineDialog";
import useTitle from "./hooks/useTitle";
import "./stylesheets/App.css";
import Keyboard from "./components/Keyboard";
import FloatingKeyboardButton from "./components/FloatingKeyboardButton";
import WidedNavbar from "./components/layout/WidedNavbar";

function App() {
  const windowSize = useWindowSize();
  const { t } = useTranslation("app");
  const [isNavbarOpen, toggleNavbar] = useToggle(windowSize.width > 900);
  useTitle(t("documentTitle"));
  return (
    <>
      <WidedNavbar isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar}/>
      <Grid container sx={{ display: "flex", justifyContent: isNavbarOpen ? "end" : "center" }}>
        <Box
          sx={{
            width: { xs: "100%", md: isNavbarOpen ? "calc(100% - 250px)" : "100%" },
            marginTop: { xs: "56px", sm: "64px" },
          }}
        >
          <Outlet />
        </Box>
      </Grid>
      <OfflineDialog />
      <Keyboard />
      <FloatingKeyboardButton />
    </>
  );
}

export default App;
