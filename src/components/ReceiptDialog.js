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
import { useTranslation } from "react-i18next";

export default function ReceiptDialog({ isOpen, toggleReceiptDialog }) {
  const { customerInfo } = useCustomerInfo();
  const { email, receiptPreference } = customerInfo;
  const [receiptIsSended, setReceiptIsSended] = useState(false);
  const [receiptIsPrinting, setReceiptIsPrinting] = useState(false);
  const [receiptIsPrinted, setReceiptIsPrinted] = useState(false);
  const {t} = useTranslation("sales");
  const printIframe = (id) => {
    setReceiptIsPrinting(true);
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframeWindow.onafterprint = () => {
      setReceiptIsPrinting(false);
      setReceiptIsPrinted(true);
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
      <DialogTitle>{t("receiptDialogTitle")}</DialogTitle>
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
            {t("receiptSendedMessage", { email })}.
          </Alert>
        }
        {
          receiptIsPrinted && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
            {t("receiptPrintedMessage")}.
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
          {t("sendDigitalReceipt")}
        </Button>
        <Button 
          autoFocus
          onClick={handlePrintReceiptButton}
          variant="contained"
          color="primary"
          sx={actionButtonStyle}
          disabled={receiptIsPrinting}
        >
          {t("printReceipt")}
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