import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

import { ReportGmailerrorredOutlinedIcon as AlertIcon }  from "@mui/icons-material/ReportGmailerrorredOutlinedIcon";

export default function OfflineDialog() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <AlertIcon size="24px" sx={{ mr: 1 }} /> 
        Internal Server Error
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sorry, an internal server error has occurred, please try again later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}