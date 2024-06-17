import { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListSubheader,
  Divider,
  styled
} from "@mui/material";
import {
  ManageSearchOutlined as ManageSearchOutlinedIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useBasketItems, useBasketItemsDispatch } from "../hooks/useBasket"; 
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import BasicTitleBar from "../components/BasicTitleBar";
import NumpadAndInput from "../components/NumpadAndInput";
import Footer from "../components/layout/Footer";
import addTaxesToPrice from "../libs/addTaxesToPrice";  

function calcSubtotalPrice(basketItems) {
  let total = 0;
  basketItems.forEach(i => {
    total += addTaxesToPrice(i) * i.measure;
  });
  return total.toFixed(2);
};

function PriceSummary () {
  const { t } = useTranslation("sales");
  const basketItems = useBasketItems();
  const subtotalPrice = calcSubtotalPrice(basketItems);
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
            {subtotalPrice} $
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default function Payment() {
  const { t } = useTranslation("sales");
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const basketItems = useBasketItems();
  const basketItemsDispatch = useBasketItemsDispatch();

  function handleSnackbarClose() {
    setSnackbarMessage("");
  };
  function handlePayButtonClick() {
    if (basketItems.length === 0) {
      setSnackbarMessage("foo");
      setTimeout(() => {
        navigate("/sales"); 
      }, 2000);
    } else {
      navigate("/checkout"); 
    }
  }
  function handleViewPriceClick() {
    navigate("/view-prices");
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
              flexDirection: "column",
              p: 1
            }}
          >
            <Box sx={{ width: "100%", display: "flex" }}>
              <Button fullWidth size="large" variant="contained" sx={{ mr: 0.5 }}>Hediye Çeki</Button>
              <Button fullWidth size="large" variant="contained" sx={{ ml: 0.5 }}>Kupon Harcama</Button>
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
              <ProductList value={selectedProduct} onChange={setSelectedProduct}  />
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
              py: 2
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ mb: 8 }}>
                <List subheader={
                  <ListSubheader>Özet</ListSubheader>
                  }>
                  <SummaryItem>
                    <SummaryTypography sx={{ }} variant="body1" color="text.primary">Ödenen Tutar:</SummaryTypography>
                    <SummaryTypography variant="body1" color="primary">0.00 $</SummaryTypography>
                  </SummaryItem>
                  <Divider />
                  <SummaryItem>
                    <SummaryTypography variant="body1">Kalan Tutar</SummaryTypography>
                    <SummaryTypography variant="body1" color="error">0.00 $</SummaryTypography>
                  </SummaryItem>
                  <Divider />
                  <SummaryItem>
                    <SummaryTypography component="div" variant="body1">Para Üstü:</SummaryTypography>
                    <SummaryTypography variant="body1" color="text.secondary">0.00 $</SummaryTypography>
                  </SummaryItem>
                </List>
              </Box>
              <Box sx={{ px: 1 }}>
                <NumpadAndInput 
                  onChange={handleNumpadChange}
                  unit="price"
                  measure={0.00} 
                  AdditionalButton={
                    <Button fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ flexGrow: 1 }}
                      onClick={handlePayButtonClick}
                    >{t("pay")}</Button>
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

const typographyStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden"
};
const summaryItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  flexWrap: "wrap",
  mr: 1,
  "&:last-child": {
    mr: 0
  }
};

const SummaryItem = styled(ListItem)(summaryItemStyle);
const SummaryTypography = styled(Typography)(typographyStyle);
