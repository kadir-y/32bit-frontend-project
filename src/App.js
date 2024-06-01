import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import OfflineAlert from "./components/OfflineAlert";
import useTitle from "./hooks/useTitle";
import "./stylesheets/App.css";
import Keyboard from "./components/Keyboard";
import FloatingKeyboardButton from "./components/FloatingKeyboardButton";

function App() {
  const { t } = useTranslation("app");
  useTitle(t("documentTitle"));
  return (
    <>
      <Outlet />
      <OfflineAlert />
      <Keyboard />
      <FloatingKeyboardButton />
    </>
  );
}

export default App;
