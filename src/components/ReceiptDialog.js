import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  IconButton
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function ReceiptDialog({ isOpen, toggleReceiptDialog }) {
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
    printIframe("receipt-iframe");
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
          id="receipt-iframe"
          src="/payment/receipt"
          title="Receipt"
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", m: 0, p: 0 }}>
        <Button 
          onClick={handleSendDigitalReceiptButton}
          variant="contained"
          color="error"
          sx={actionButtonStyle}
        >
          Send Digital Receipt
        </Button>
        <Button 
          autoFocus
          onClick={handlePrintReceiptButton}
          variant="contained"
          color="primary"
          sx={actionButtonStyle}
        >
          Print Receipt
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const actionButtonStyle = {
  width: "100%",
  height: "3rem",
  margin: "0 !important",
  padding: "0 !important",
  borderRadius: 0
}