import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  IconButton
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRef } from "react";

export default function ReceiptDialog({ isOpen, toggleReceiptDialog }) {
  const receiptRef = useRef(null);
  const printIframe = (id) => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  };
  function handlePrintReceiptButton() {
    printIframe("receipt");
  };
  function handleSendDigitalReceiptButton() {

  };
  function handleClose() {
    toggleReceiptDialog();
  };
  return(
    <Dialog
      onClose={handleClose}
      open={isOpen}
    >
      <DialogTitle>Receipt</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <iframe
          id="receipt"
          src="/payment/receipt"
          title="Receipt"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSendDigitalReceiptButton}>
          Send Digital Receipt
        </Button>
        <Button autoFocus onClick={handlePrintReceiptButton}>
          Print Receipt
        </Button>
      </DialogActions>
    </Dialog>
  );
}