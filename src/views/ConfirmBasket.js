import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  ButtonGroup
} from "@mui/material";
import {
  ManageSearchOutlined as ManageSearchOutlinedIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useBasketItems, useBasketItemsDispatch } from "../hooks/useBasket";
import { useNavigate } from "react-router-dom";
import { useFormInput } from "../hooks/useFormInput";
import { useCustomerInfo } from "../hooks/useCustomerInfo";
import { useCampaign } from "../hooks/useCampaign";
import ProductList from "../components/ProductList";
import BasicTitleBar from "../components/BasicTitleBar";
import NumpadAndInput from "../components/NumpadAndInput";
import Footer from "../components/layout/Footer";
import TextInput from "../components/TextInput";
import PriceSummary from "../components/PriceSummary";
import CampaignList from "../components/CampaignList";
import sumArray from "../libs/sumArray";
import makeDiscount from "../libs/makeDiscount";
import campaignIsAvailable from "../libs/campaignIsAvailable";

const heightStyle = {
  height: "calc(100vh - 9.5rem)"
};

export default function ConfirmBasket() {
  const { t } = useTranslation("sales");
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const basketItems = useBasketItems();
  const basketItemsDispatch = useBasketItemsDispatch();
  const { customerInfo, setCustomerInfo } = useCustomerInfo();
  const { removeCampaign, campaigns } = useCampaign();
  const {
    props: customerEmailProps
  } = useFormInput({
    type: "text",
    label: t("customerEmailPlaceholder"),
    onChange: handleCustomerEmailChange
  });
  function handleSnackbarClose() {
    setSnackbarMessage("");
  };
  function handleConfirmButtonClick() {
    if (basketItems.length === 0) {
      setSnackbarMessage(t("productNotFoundInBasket"));
      setTimeout(() => {
        navigate("/sales"); 
      }, 2000);
    } else {
      navigate("/payment"); 
    }
  }
  function handleViewPriceClick() {
    navigate("/view-prices");
  };
  function handleAbortReceipt() {
    basketItemsDispatch({ type: "cleared" });
    setSelectedProduct({});
    navigate("/sales");
  };
  function handleDeleteProduct() {
    basketItemsDispatch({ type: "deleted", product: { id: selectedProduct.id }});
  };
  function handleReceiptPreferenceChange(value) {
    setCustomerInfo({
      ...customerInfo,
      receiptPreference: value
    });
  };
  function handleCustomerEmailChange(e) {
    setCustomerInfo({
      ...customerInfo,
      email: e.target.value
    });
  };
  function handleNumpadChange(measure) {
    const product = basketItems.find(i => i.id === selectedProduct.id);
    const subtotalPrice = selectedProduct.priceWithTaxes * measure;
    const totalPrice = makeDiscount(selectedProduct.priceWithTaxes, selectedProduct.discount) * measure;
    basketItemsDispatch({
      type: "changed",
      product: {
        ...product,
        measure,
        totalPrice,
        subtotalPrice
      }
    });
  };
  
  useEffect(() => {
    campaigns.forEach(campaign => {
      let { isAvailable, filteredItems } = campaignIsAvailable(campaign, basketItems);
      if (!isAvailable) {
        removeCampaign(campaign.id);
        filteredItems.forEach(item => {
          basketItemsDispatch({
            type: "changed",
            product: {
              ...item,
              totalPrice: item.subtotalPrice,
              discount: undefined
            }
          });
        });
      } else {
        filteredItems.forEach(item => {
          if (item.discount ) return;
          const totalPrice = makeDiscount(item.totalPrice, campaign.amount);
          basketItemsDispatch({
            type: "changed",
            product: {
              ...item,
              totalPrice,
              discount: campaign.amount
            }
          });
        });
      }
    });
  }, [
    basketItems,
    basketItemsDispatch,
    campaigns,
    removeCampaign
  ]);

  const totalPrice = sumArray(basketItems, "totalPrice");
  const subtotalPrice = sumArray(basketItems, "subtotalPrice");
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
      <Box sx={{ width: "100%", px: 2, pt: 1 }}>
        <BasicTitleBar
          title={t("salesDocument")}
          bakwardLink="/sales"
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
        <Grid item xs={12} md={4} sx={{ ...heightStyle }}>
          <Paper
            sx={{
              minHeight: { md: "100%" },
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              position: "relative"
            }}
          >
            <Box sx={{ 
              width: "100%",
              pt: 3, px: 2, mb: 6
              }}>
              <Typography 
                sx={{ mb: 1 }}
                component="div"
                variant="subtitle2"
              >{t("receiptPreferenceLabel")}</Typography>
              <TextInput 
                id="customer-email"
                disabled={customerInfo.receiptPreference === "normal"}
                sx={{ mb: 1 }}
                { ...customerEmailProps }
              />
              <ButtonGroup fullWidth size="small" aria-label="User receipt preference">
                <Button 
                  variant={customerInfo.receiptPreference === "normal" ? "contained" : "outlined"}
                  onClick={() => handleReceiptPreferenceChange("normal")}
                  color="error"
                >{t("defaultReceipt")}</Button>
                <Button 
                  variant={customerInfo.receiptPreference === "ereceipt" ? "contained" : "outlined"}
                  onClick={() => handleReceiptPreferenceChange("ereceipt")}
                  color="success"
                >{t("digitalReceipt")}</Button>
              </ButtonGroup>
            </Box>
            <Box sx={{ 
              width: "100%",
              height: "calc(100% - 12rem)",
              position: "absolute",
              overflow: "auto",
              bottom: 0
            }}><CampaignList /></Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={5} sx={{ ...heightStyle, px: { md: 2 }  }}>
          <Paper
            sx={{
              minHeight: { md: "100%" },
              position: "relative",
              overflow: "hidden"
            }}
            elevation={4}
          >
            <Box sx={{
              height: "calc(100% - 5rem)",
              width: "100%",
              overflow: "auto",
              position: "absolute"
            }}>
              <ProductList 
                value={selectedProduct}
                onChange={setSelectedProduct}
              />
            </Box>

            <Box sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
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
                  <Button fullWidth sx={{ mr: 0.5 }} color="success" variant="contained">{t("seller")}</Button>
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
                      onClick={handleConfirmButtonClick}
                    >{t("confirm")}</Button>
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
