import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from "@mui/material";

export default function ReceiptDiaolog({ isOpen }) {
  function handlePrintButtonClick() {

  };
  function handleSendDigitalReceiptClick() {

  };
  function handleClose() {
    
  };
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Receipt</DialogTitle>
      <DialogContent>
        <Typography>
          asdsa
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handlePrintButtonClick}>
          Print Receipt
        </Button>
        <Button onClick={handleSendDigitalReceiptClick}>
          Send Digital Receipt
        </Button>
      </DialogActions>
    </Dialog>
  );
}