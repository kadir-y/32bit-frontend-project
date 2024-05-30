import useOnline from "../hooks/useOnline";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Box
} from "@mui/material";

import WifiOffIcon from "@mui/icons-material/WifiOff";

import { useTranslation } from "react-i18next";

export default function OfflineAlert() {
  const { t } = useTranslation("app");
  const isOnline = useOnline();
  return (
    <Dialog
      open={!isOnline}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <WifiOffIcon size="24px" sx={{ mr: 1 }} /> {t("offlineDialogTitle")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 1 }}>
          {t("offlineDialogMessage")}
        </DialogContentText>
      </DialogContent>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </Dialog>
  );
}