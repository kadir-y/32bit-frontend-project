import { Snackbar, Fab, Alert } from "@mui/material";
import { Keyboard as KeyboardIcon } from "@mui/icons-material";
import { useKeyboard } from "../hooks/useKeyboard";
import { useToggle } from "../hooks/useToggle";
import { useTranslation } from "react-i18next";

let interval;
export default function FloatingKeyboardButton() {
  const { t } = useTranslation("keyboard");
  const { openKeyboard, inputData } = useKeyboard();
  const [barIsOpen, setBarIsOpen] = useToggle();

  function handleMouseDown() {
    if (inputData.ignore) {
      clearInterval(interval);
      setBarIsOpen(true);
      interval = setTimeout(() => {
        setBarIsOpen(false);
      }, 1000)
    }
    openKeyboard();
  };
  return (
    <>
      <Snackbar
        open={barIsOpen}
        severity="success"
      >
        <Alert
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >{t("notFocusedMessage")}</Alert>
      </Snackbar>
      <Fab 
        variant="extended"
        onMouseDown={handleMouseDown}
        sx={{
          position: "fixed",
          zIndex: 9999,
          bottom: "1rem",
          right: "1rem"
        }}
      >
        <KeyboardIcon sx={{ mr: 1 }} />
        { t("keyboard") }
      </Fab>
    </>
  );
} 