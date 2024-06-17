import { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  ButtonGroup,
  ListSubheader,
  List,
  ListItemText,
  ListItemButton,
  Divider
} from "@mui/material";
import {
  ManageSearchOutlined as ManageSearchOutlinedIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useBasketItems, useBasketItemsDispatch } from "../hooks/useBasket";
import { useCampaign } from "../hooks/useCampaign";
import { useNavigate } from "react-router-dom";
import { useFormInput } from "../hooks/useFormInput";
import ProductList from "../components/ProductList";
import BasicTitleBar from "../components/BasicTitleBar";
import NumpadAndInput from "../components/NumpadAndInput";
import Footer from "../components/layout/Footer";
import TextInput from "../components/TextInput";
import addTaxesToPrice from "../libs/addTaxesToPrice";  
import makeDiscount from "../libs/makeDiscount";  

function calcSubtotalPrice(basketItems) {
  let total = 0;
  basketItems.forEach(i => {
    total += addTaxesToPrice(i) * i.measure;
  });
  return total.toFixed(2);
};

function calcTotalPrice(basketItems) {
  let total = 0;
  basketItems.forEach(i => {
    console.log(i)
    total += makeDiscount(addTaxesToPrice(i) * i.measure, i.discount);
  });
  return total.toFixed(2);
};

function PriceSummary () {
  const { t } = useTranslation("sales");
  const basketItems = useBasketItems();
  const subtotalPrice = calcSubtotalPrice(basketItems);
  const totalPrice = calcTotalPrice(basketItems);
  return (
    <>
      <Box sx={{
        width: "100%",
        px: 2,
        py: 1,
        bgcolor: "info.main",
        color: "white"
      }}>
        <Box sx={{ display: "flex" }}>
          <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
            {t("subtotal")} 
          </Typography>
          <Typography component="span" variant="body1">
            {subtotalPrice} $
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        width: "100%",
        px: 2,
        pb: 1,
        pt: 1,
        bgcolor: "primary.main",
        color: "#fff"
      }}>
        <Box sx={{ display: "flex" }}>
          <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
            {t("totalPrice")}
          </Typography>
          <Typography component="span" variant="body1">
            {totalPrice} $
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default function ConfirmBasket() {
  const { t } = useTranslation("sales");
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [invoicePreference, setInvoicePreference] = useState("normal");
  const basketItems = useBasketItems();
  const basketItemsDispatch = useBasketItemsDispatch();
  const { applyCampaign, campaigns } = useCampaign();
  const {
    props: customerEmailProps
  } = useFormInput({
    type: "text",
    label: t("customerEmailPlaceholder"),
  });

  function handleSnackbarClose() {
    setSnackbarMessage("");
  };
  function handleConfirmButtonClick() {
    if (basketItems.length === 0) {
      setSnackbarMessage("foo");
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
  function handleNumpadChange(value) {
    basketItemsDispatch({
      type: "changed",
      product: {
        ...selectedProduct,
        measure: value
      }
    });
  };
  function handleCampaignButtonClick(campaign) {
    applyCampaign(campaign);
    basketItems.forEach(i => {
      if (i.category === "groceries") {
        basketItemsDispatch({
          type: "changed",
          product: {
            ...i,
            discount: 20,
          }
        });
      }
    });
  };
  function campaignIsApplicable(campaign) {
    console.log(campaigns);
    if (campaigns.includes(campaign)) return false;
    let total = 0;
    basketItems.forEach(i => {
      if (i.category === "groceries") {
        total += addTaxesToPrice(i) * i.measure;
      }
    });
    console.log(total);
    return total >= 20;
  }
  
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
      <Grid container sx={{
        height: "calc(100vh - 8.5rem)",
        overflow: "hidden",
        py: 1.5,
        px: 2
      }}>
        <Grid item xs={12} md={4} sx={{ pr: { md: 1 } }}>
          <Paper
            sx={{ 
              width: "100%",
              height: "auto",
              minHeight: { md: "100%" },
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Box sx={{ mt: 1, mb: 6 }}>
              <Button fullWidth size="large" variant="contained" sx={{ mb: 0.5 }}>Hadi Cüzdan</Button>
              <Button fullWidth size="large" variant="contained" sx={{ mb: 1 }}>Tombank Cüzdan</Button>
              <Button fullWidth size="large" variant="contained" color="warning">E Fatura</Button>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TextInput 
                id="customer-email"
                disabled={invoicePreference === "normal"}
                sx={{ mb: 1 }}
                { ...customerEmailProps }
              />
              <ButtonGroup fullWidth size="small" aria-label="User receipt preference">
                <Button 
                  variant={invoicePreference === "normal" ? "contained" : "outlined"}
                  onClick={() => setInvoicePreference("normal")}
                  color="error"
                >Normal Fatura</Button>
                <Button 
                  variant={invoicePreference === "einvoice" ? "contained" : "outlined"}
                  onClick={() => setInvoicePreference("einvoice")}
                  color="success"
                >E-Fatura</Button>
              </ButtonGroup>
            </Box>
            <Box sx={{ width: "100%", height: "10rem", overflow: "auto" }}>
              <List subheader={
                <ListSubheader>Uygulanabilir Kampanyalar</ListSubheader>
              }> 
                  {
                    campaignIsApplicable("groceries20") ?
                    <>
                      <ListItemButton onClick={() => handleCampaignButtonClick("groceries20")}>
                        <ListItemText primary="Groceries 20%" secondary="20$ ve üzeri" />
                      </ListItemButton>
                      <Divider />  
                    </> : 
                    <Typography variant="subtitle2" sx={{ px: 2 }}>Uygulanbilir bir kampanya bulunamadı</Typography>
                  }
                </List>
            </Box>

          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={5} sx={{ px: { md: 1 } }}>
          <Paper
            sx={{
              width: "100%",
              height: "auto",
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
              <PriceSummary />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3} sx={{ pl: { md: 1 } }}>
          <Paper
            sx={{
              width: "100%",
              height: "auto",
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
                  unit={selectedProduct.unit}
                  measure={selectedProduct.measure} 
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
      <Box sx={{ width: "calc(100% - 9.5rem)", px: 2, pt: 1 }}>
        <Footer />
      </Box>
    </>
  );
}
