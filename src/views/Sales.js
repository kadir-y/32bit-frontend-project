import { useState, useRef } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography
} from "@mui/material";
import {
  ManageSearchOutlined as ManageSearchOutlinedIcon
} from '@mui/icons-material';
import { useBasket, useBasketDispatch } from "../hooks/useBasket"; 
import { useFormInput } from "../hooks/useFormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput";
import ProductList from "../components/ProductList";
import BasicTitleBar from "../components/BasicTitleBar";
import NumpadAndInput from "../components/NumpadAndInput";
import ProductSearchSection from "../components/ProductSearchSection";
import Footer from "../components/layout/Footer";
import addTaxToUnitPrice from "../libs/addTaxToUnitPrice";
import getMeasureDigit from "../libs/getMeasureDigit";

function calcSubtotalPrice(basket) {
  let total = 0;
  basket.forEach(i => {
    total += addTaxToUnitPrice(i) * i.measure;
  })
  return total.toFixed(2);
}

function PriceSummary () {
  const basket = useBasket();
  const subtotalPrice = calcSubtotalPrice(basket);
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
            Ara Toplam 
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
            Toplam Tutar
          </Typography>
          <Typography component="span" variant="body1">
            {subtotalPrice} $
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default function SalesPage() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const basketDispatch = useBasketDispatch();
  const basket = useBasket();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const fetchCount = useRef(0);
  const {
    props: inputProps,
    setValue: setSearchInputValue
  } = useFormInput({
    label: "Klavyeden Ürün girişi",
    type: "text",
    onChange: handleSearchInputChange
  });

  function handleViewPriceClick() {
    navigate("/view-prices");
  };
  function fetchProducts(searchParameter) {
    return axios.get(`/products?search=${searchParameter}&limit=10&page=1`);
  };
  function addToBasket(product) {
    const unit = product.unit;
    const indexOf = basket.findIndex(p => p.id === product.id);
    if (indexOf === -1) {
      product.measure = unit === "piece" ? 1 : parseFloat(0).toFixed(getMeasureDigit(unit));
    } else {
      const oldProduct = basket.find(p => p.id === product.id);
      if (unit === "piece") {
        product.measure = parseInt(oldProduct.measure) + 1;
      } else {
        product.measure = oldProduct.measure;
      }
    }
    basketDispatch({
      type: indexOf === -1 ? "added" : "changed", 
      product
    })
    setSearchInputValue("");
    setSelectedProduct(product);
  };

  async function handleSearchInputChange(e) {
    const value = e.target.value;
    fetchCount.current++;
    const queue = fetchCount.current;
    fetchProducts(value)
      .then(res => {
        if (queue !== fetchCount.current) return;
        const { products } = res.data;
        if (products.length === 1 && value.length === 13) {
          addToBasket(products[0]);
        } else {
          setProducts(products);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  function handleAbortReceipt() {
    basketDispatch({ type: "cleared" });
    setSelectedProduct({});
  };
  function handleDeleteProduct() {
    basketDispatch({ type: "deleted", product: { id: selectedProduct.id }});
  }
  function handleNumpadChange(value) {
    if (parseFloat(value) === 0) {
      basketDispatch({
        type: "deleted",
        product: selectedProduct
      });
      setSelectedProduct({});
    } else {
      basketDispatch({
        type: "changed",
        product: {
          ...selectedProduct,
          measure: value
        }
      });
    }
  }

  return (
    <>
      <Box sx={{ width: "100%", px: 2, pt: 1 }}>
        <BasicTitleBar
          title="Satış Belgesi"
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
              Fiyatları Gör
              <ManageSearchOutlinedIcon sx={{ ml: 1 }} />
            </Button>
          }
        />
      </Box>
      <Grid container sx={{
        height: "calc(100vh - 9rem)",
        overflow: "auto",
        pt: 2,
        pb: 1,
        px: 2
      }}>
        <Grid item xs={12} md={4} lg={5} sx={{ pr: { md: 1 } }}>
          <Paper
            sx={{
              width: "100%",
              height: { xs: "auto", md: "100%" },
              px: 1,
              pt: 1
            }}
          >
            <Box>
              <TextInput id="search-input" {...inputProps} />
            </Box>
            <Box sx={{ mt: 1 }}>
              <ProductSearchSection addToBasket={addToBasket} products={products} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ px: { md: 1 } }}>
          <Paper
            sx={{
              width: "100%",
              height: { xs: "auto", md: "100%" },
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
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: { xs: "auto", md: "100%" },
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
                <Button fullWidth variant="contained" color="primary">TAKSİTLİ</Button>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Button fullWidth sx={{ mr: 0.5 }} color="error" variant="outlined" onClick={handleDeleteProduct}>
                    SATIR SİL
                  </Button>
                  <Button fullWidth sx={{ ml: 0.5 }} color="error" variant="contained" onClick={handleAbortReceipt}>
                    BELGE İPTAL
                  </Button>
                </Box>
                <Button fullWidth variant="contained" color="success">Kampanyalar</Button>
              </Box>
              <Box>
                <NumpadAndInput 
                  onChange={handleNumpadChange}
                  unit={selectedProduct.unit}
                  measure={selectedProduct.measure} 
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
