import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import OfflineDiaolog from "./components/OfflineDiaolog";
import useTitle from "./hooks/useTitle";
import "./stylesheets/App.css";
import PopupKeyboard from "./components/PopupKeyboard";
import { useKeyboard } from "./hooks/useKeyboard";

function App() {
  const { t } = useTranslation("app");
  const { openKeyboard } = useKeyboard();
  useTitle(t("documentTitle"))
  return (
    <>
      <Outlet />
      <OfflineDiaolog />
      <PopupKeyboard />
      <button onClick={openKeyboard}>Keyboard</button>
    </>
  );
}

export default App;
