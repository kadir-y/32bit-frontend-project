import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Alert
} from "@mui/material";
import { useState } from "react";
import { 
  Close as CloseIcon,
  Check as CheckIcon } from "@mui/icons-material";
import { useCustomerInfo } from "../hooks/useCustomerInfo";

export default function ReceiptDialog({ isOpen, toggleReceiptDialog }) {
  const { customerInfo } = useCustomerInfo();
  const { email, receiptPreference } = customerInfo;
  const [receiptIsSended, setReceiptIsSended] = useState(false);
  const [receiptIsPrinting, setReceiptIsPrinting] = useState(false);
  const printIframe = (id) => {
    setReceiptIsPrinting(true);
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframeWindow.onafterprint = () => {
      setReceiptIsPrinting(false);
    };

    iframe.focus();
    iframeWindow.print();
  };
  function handlePrintReceiptButton() {
    printIframe("receipt-iframe");
  };
  function handleSendDigitalReceiptButton() {
    setReceiptIsSended(true);
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
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {
          receiptIsSended && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
            Receipt is sended to {email}.
          </Alert>
          
        }
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
          disabled={receiptPreference !== "ereceipt" || receiptIsSended}
        >
          Send Digital Receipt
        </Button>
        <Button 
          autoFocus
          onClick={handlePrintReceiptButton}
          variant="contained"
          color="primary"
          sx={actionButtonStyle}
          disabled={receiptIsPrinting}
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