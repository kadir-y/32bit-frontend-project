import { useState, useRef } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import {
  ManageSearchOutlined as ManageSearchOutlinedIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../hooks/useToggle";
import ProductList from "../components/ProductList";
import BasicTitleBar from "../components/BasicTitleBar";
import NumpadAndInput from "../components/NumpadAndInput";
import PriceSummary from "../components/PriceSummary";
import PaymentAmountDisplay from "../components/PaymentAmountDisplay";
import ReceiptDialog from "../components/ReceiptDialog";
import Footer from "../components/layout/Footer";
import sumArray from "../libs/sumArray"
import {
  useBasketItems,
  useBasketItemsDispatch
} from "../hooks/useBasket"; 
import { useLocalStorage } from "../hooks/useLocalStorage";

const heightStyle = {
  height: "calc(100vh - 9.5rem)"
}
export default function SalesPage() {
  const { t } = useTranslation("sales");
  const [showReceiptDialog, toggleReceiptDialog] = useToggle();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const basketItemsDispatch = useBasketItemsDispatch();
  const basketItems = useBasketItems();
  const setReceiptData = useLocalStorage("receiptData")[1];
  const navigate = useNavigate();
  const totalPrice = sumArray(basketItems, "totalPrice");
  const subtotalPrice = sumArray(basketItems, "subtotalPrice");
  const [remainingAmount, setRemainingAmount] = useState(totalPrice);
  const [amountPaid, setAmountPaid] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);
  const numpadValue = useRef(0);
  function handleViewPriceClick() {
    navigate("/view-prices");
  };
  function handleSnackbarClose() {
    setSnackbarMessage("");
  };
  function handleButtonClick() {
    const measure = numpadValue.current;
    if (measure < 0) return;
    setAmountPaid(currentAmountPaid => currentAmountPaid + measure);
    setRemainingAmount(currentRemainingAmount =>
      currentRemainingAmount - measure < 0 
      ? 0
      : currentRemainingAmount - measure
    );
    
    setChangeAmount(() =>
      totalPrice - (parseFloat(amountPaid) + measure) < 0 
      ? (parseFloat(amountPaid) + measure) - totalPrice 
      : 0
    );
  };
  function handleAbortReceipt() {
    basketItemsDispatch({ type: "cleared" });
    setSnackbarMessage("You are redirected to the Sales Page...");
    setTimeout(() => {
      navigate("/sales");
    }, 2000);
  };
  function handleNumpadChange(measure) {
    numpadValue.current = parseFloat(measure);
  };
  function handleFinishProcessButton() {
    toggleReceiptDialog();
    const receiptData = {
      storeName: "Sample Store",
      storeAddress: "Merkez Mahallesi 4112 Sokak No:12 0242 423 22 51 Antalya/Serik",
      date: "07.08.2024",
      time: "14.50",
      sellingNumber: 2,
      sellingType: "Nakit",
      cashier: "Ahmet",
      products: basketItems,
      amountPaid,
      changeAmount,
      totalPrice
    }
    setReceiptData(receiptData);
  };
  return (
    <>
      <ReceiptDialog
        isOpen={showReceiptDialog}
        toggleReceiptDialog={toggleReceiptDialog}
      />
      <Snackbar
        open={snackbarMessage !== ""}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >{snackbarMessage}</Alert>
      </Snackbar>
      <Box sx={{ px: 2, pt: 1 }}>
        <BasicTitleBar
          title={t("salesDocument")}
          bakwardLink="/confirm-basket"
          endSlot={
            <Button
              sx={{
                textTransform: "none",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}
              variant="text"
              onClick={handleViewPriceClick}
            >
              {t("viewPrices")}
              <ManageSearchOutlinedIcon sx={{ ml: 1 }} />
            </Button>
          }
        />
      </Box>
      <Grid container sx={{ px: 2, paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
        <Grid item xs={12} md={3} sx={{ ...heightStyle }}>
          <Paper
            sx={{ 
              minHeight: { md: "100%" },
              overflow: "hidden",
              py: 8, px: 2
            }}
          >
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <Button fullWidth sx={{ mr: 0.5 }} color="error" variant="outlined" disabled>
                  {t("deleteLine")}
                </Button>
                <Button fullWidth sx={{ ml: 0.5 }} color="error" variant="contained" onClick={handleAbortReceipt}>
                  {t("abortProcess")}
                </Button>
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button fullWidth variant="contained" color="primary">{t("installment")}</Button>
            </Box>
            <Box sx={{ width: "100%", display: "flex"}}>
              <Button fullWidth size="large" variant="contained" sx={{ mr: 0.5 }}>{t("giftCertificate")}</Button>
              <Button fullWidth size="large" variant="contained" sx={{ ml: 0.5 }}>{t("spendingCoupon")}</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} sx={{ ...heightStyle, px: { md: 2 } }}>
          <Paper
            sx={{
              minHeight: { md: "100%" },
              position: "relative",
              overflow: "hidden"
            }}
            elevation={4}
          >
            <Box sx={{
              width: "100%",
              maxHeight: "calc(100% - 5rem)",
              overflow: "auto",
              position: "absolute"
            }}>
              <ProductList />
            </Box>

            <Box sx={{
              width: "100%",
              position: "absolute",
              bottom: 0
            }}>
              <PriceSummary
                totalPrice={totalPrice}
                subtotalPrice={subtotalPrice}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ ...heightStyle }}>
          <Paper
            sx={{
              width: "100%",
              minHeight: { md: "100%" },
              display: "flex",
              alignItems: "center",
              px: 1,
              py: 2
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box>
                <PaymentAmountDisplay
                  remainingAmount={remainingAmount}
                  amountPaid={amountPaid}
                  changeAmount={changeAmount}
                />
                <NumpadAndInput 
                  onChange={handleNumpadChange}
                  AdditionalButton={
                    <Button fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ flexGrow: 1 }}
                      onClick={handleButtonClick}
                    >{t("pay")}</Button>
                  }
                />
                <Button 
                  fullWidth
                  variant="contained"
                  disabled={remainingAmount !== 0}
                  color="secondary"
                  size="large"
                  sx={{ height: "3rem", mt: 2 }}
                  onClick={handleFinishProcessButton}
                >
                  {t("finishProcess")}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid> 
      <Box sx={{ width: "calc(100% - 9.5rem)", px: 2 }}>
        <Footer />
      </Box>
    </>
  );
}
