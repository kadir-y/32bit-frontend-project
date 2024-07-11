import { useState } from "react";
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
import ProductList from "../components/ProductList";
import BasicTitleBar from "../components/BasicTitleBar";
import NumpadAndInput from "../components/NumpadAndInput";
import ProductSearchSection from "../components/ProductSearchSection";
import PriceSummary from "../components/PriceSummary";
import Footer from "../components/layout/Footer";
import sumArray from "../libs/sumArray"
import {
  useBasketItems,
  useBasketItemsDispatch
} from "../hooks/useBasket"; 

const heightStyle = {
  height: "calc(100vh - 9.5rem)"
}
export default function SalesPage() {
  const { t } = useTranslation("sales");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const basketItemsDispatch = useBasketItemsDispatch();
  const basketItems = useBasketItems();
  const navigate = useNavigate();

  function handleViewPriceClick() {
    navigate("/view-prices");
  };
  function handleSnackbarClose() {
    setSnackbarMessage("");
  };
  function handleNextButtonClick() {
    if (basketItems.length === 0) {
      setSnackbarMessage("Not found product in basket.");
    } else {
      navigate("/confirm-basket");
    }
  };
  function handleAbortReceipt() {
    basketItemsDispatch({ type: "cleared" });
    setSelectedProduct({});
  };
  function handleDeleteProduct() {
    basketItemsDispatch({ type: "deleted", product: selectedProduct });
  };
  function handleNumpadChange(measure) {
    const totalPrice = selectedProduct.priceWithTaxes * measure;
    const subtotalPrice = totalPrice;
    basketItemsDispatch({
      type: "changed",
      product: {
        ...selectedProduct,
        measure,
        totalPrice,
        subtotalPrice
      }
    });
  };
  const totalPrice = sumArray(basketItems, "totalPrice")
  const subtotalPrice = sumArray(basketItems, "subtotalPrice")
  return (
    <>
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
          backwardLink="/"
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
        <Grid item xs={12} md={4} lg={5} sx={{ ...heightStyle }}>
          <Paper
            sx={{ 
              minHeight: { md: "100%" },
              overflow: "hidden"
            }}
          >
            <Box sx={{ mt: 1 }}>
              <ProductSearchSection 
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ ...heightStyle, px: { md: 2 } }}>
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
              <ProductList value={selectedProduct} onChange={setSelectedProduct}  />
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
        <Grid item xs={12} md={4} lg={3} sx={{ ...heightStyle }}>
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
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Button fullWidth sx={{ mr: 0.5 }} color="success" variant="contained">Satıcı</Button>
                  <Button fullWidth sx={{ ml: 0.5 }} variant="contained">A101 Hadi</Button>
                </Box>
                <Button fullWidth variant="contained" color="primary">{t("installment")}</Button>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Button fullWidth sx={{ mr: 0.5 }} color="error" variant="outlined" onClick={handleDeleteProduct}>
                    {t("deleteLine")}
                  </Button>
                  <Button fullWidth sx={{ ml: 0.5 }} color="error" variant="contained" onClick={handleAbortReceipt}>
                    {t("abortProcess")}
                  </Button>
                </Box>
                <Button fullWidth variant="contained" color="success">{t("campaigns")}</Button>
              </Box>
              <Box>
                <NumpadAndInput 
                  onChange={handleNumpadChange}
                  selectedProduct={selectedProduct}
                  AdditionalButton={
                    <Button fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ flexGrow: 1 }}
                      onClick={handleNextButtonClick}
                    >{t("next")}</Button>
                  }
                />
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
