import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import OfflineDialog from "./components/OfflineDialog";
import useTitle from "./hooks/useTitle";
import "./stylesheets/App.css";
import Keyboard from "./components/Keyboard";
import FloatingKeyboardButton from "./components/FloatingKeyboardButton";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation("app");

  function fetchStoreStatus() {
    return axios.get("/");
  };
  useEffect(() => {
    fetchStoreStatus()
    .then(res => {
    })
    .catch(err => {
      navigate("/login")
    });
  } , [navigate]);
  useTitle(t("documentTitle"));
  return (
    <>
      <Outlet />
      <OfflineDialog />
      <Keyboard />
      <FloatingKeyboardButton />
    </>
  );
}

export default App;
