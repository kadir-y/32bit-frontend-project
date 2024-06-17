import { useState, useEffect, useRef } from "react";
import axios from "../axios"
import {
  Paper,
  Box,
  Button,
  Typography,
  Tab,
  CircularProgress
} from "@mui/material";
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';
import {
  ArrowBackIosNew as  ArrowBackIosNewIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next"; 
import { useToggle } from "../hooks/useToggle";
import { useFormInput } from "../hooks/useFormInput";
import TextInput from "./TextInput";
import AlphabeticSearchBar from "./AlphabeticSearchBar";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import kitchenImage from "../assets/images/kitchen.jpg";
import bookImage from "../assets/images/books.jpg";
import beutyImage from "../assets/images/beuty.jpg";
import addTaxesToPrice from "../libs/addTaxesToPrice";
import { 
  useBasketItems,
  useBasketItemsDispatch,
  useBasketSummary,
  useBasketSummaryDispatch
} from "../hooks/useBasket";
import normalizeMass from "../libs/normalizeMass";

const categories = [
  {
    category: "groceries",
    thumbnail: kitchenImage
  },
  {
    category: "kitchen-accessories",
    thumbnail: bookImage
  },
  {
    category: "beauty",
    thumbnail: beutyImage
  }
];

export default function ProductSearchSection({ setSelectedProduct }) {
  const { t } = useTranslation("sales");
  const basketItems = useBasketItems();
  const basketItemsDispatch = useBasketItemsDispatch();
  const basketSummary = useBasketSummary();
  const basketSummaryDispatch = useBasketSummaryDispatch();
  const [tabId, changeTab] = useState("1");
  const [startWith, setStartWith] = useState("");
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [isFetching, toggleIsFetching] = useToggle(false);
  const fetchCount = useRef(0);
  const {
    props: inputProps,
    setValue: setSearchInputValue
  } = useFormInput({
    label: t("searchInputPlaceholder"),
    type: "text",
    onChange: handleSearchInputChange
  });

  // fetching products without barcode
  useEffect(() => {
    let ignore  = false;
    fetchProducts({ startWith: "", category: "groceries" })
      .then(res => {
        if (ignore) return;
        setProducts2(res.data.products);
      })
      .catch(err => console.error(err));
    return() => ignore = true;
  }, []);

  function addToBasket(product) {
    const { unit, price, taxes } = product;
    const indexOf = basketItems.findIndex(p => p.id === product.id);
    if (indexOf !== -1 && unit === "mass") return;
    if (indexOf === -1) {
      const unitPrice = addTaxesToPrice(price, taxes);
      const measure = unit === "piece" ? 1 : normalizeMass(0);
      product.priceWithTaxes = unitPrice;
      product.totalPrice = unitPrice * measure;
      product.measure = measure; 
    } else {
      const oldProduct = basketItems.find(p => p.id === product.id);
      product.measure = oldProduct.measure + 1;
      product.totalPrice += oldProduct.priceWithTaxes;
    }
    const subtotalPrice = basketSummary.subtotalPrice + product.priceWithTaxes*product.measure;
    const totalPrice = basketSummary.totalPrice + product.priceWithTaxes*product.measure;
    basketSummaryDispatch( {
      type: "setted",
      totalPrice,
      subtotalPrice
    });
    basketItemsDispatch({
      type: indexOf === -1 ? "added" : "changed", 
      product
    });
    setSearchInputValue("");
    setSelectedProduct(product);
  };
  async function handleSearchInputChange(e) {
    const value = e.target.value;
    fetchCount.current++;
    const queue = fetchCount.current;
    toggleIsFetching(true);
    changeTab("3");
    fetchProducts({ search: value })
      .then(res => {
        if (queue !== fetchCount.current) return;
        const { products } = res.data;
        if (products.length === 1 && value.length === 13) {
          addToBasket(products[0]);
        } else {
          setProducts3(products);
        }
        toggleIsFetching(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  function handleChange(e, newValue) {
    changeTab(newValue);
  };
  function fetchProducts(obj) {
    const search = Boolean(obj.search) ? obj.search : "";
    const category = Boolean(obj.category) ? obj.category : "";
    const startWith = Boolean(obj.startWith) ? obj.startWith : "";
    const requestUrl = "/products?" +
      `search=${search}` +
      `&category=${category}` +
      `&startWith=${startWith}` +
      "&page=1&limit=20";
    return axios.get(requestUrl);
  };
  function handleBackwardClick() {
    setProducts1([]);
  };

  function handleStartWithChange(e) {
    const nStartWith = e.target.value;
    setStartWith(nStartWith);
    fetchCount.current++;
    const queue = fetchCount.current;
    toggleIsFetching(true);
    fetchProducts({ startWith: nStartWith })
      .then(res => {
        if (queue !== fetchCount.current) return;
        setProducts2(res.data.products);
        toggleIsFetching(false);
      })
      .catch(err => console.error(err));
  };
  function handleCategoryClick(category) {
    fetchCount.current++;
    const queue = fetchCount.current;
    toggleIsFetching(true);
    fetchProducts({ category })
      .then(res => {
        if (queue !== fetchCount.current) return;
        setProducts1(res.data.products);
        toggleIsFetching(false);
      })
      .catch(err => console.error(err));
  }

  return (
    <Box>
      <Box sx={{ mb: 2, px: 1, pt: 1 }}> 
        <TextInput id="search-input" {...inputProps} />
      </Box>
      <TabContext value={tabId}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Tabs for search products">
            <Tab sx={{ textTransform: "none" }} label={t("tab1Label")} value="1" />
            <Tab sx={{ textTransform: "none" }} label={t("tab2Label")} value="2" />
            <Tab sx={{ textTransform: "none" }} label={t("tab3Label")} value="3" />
          </TabList>
        </Box>
          <Box sx={{
            overflow: "auto",
            height: "calc(100vh - 18.1rem)"
          }}>
            { isFetching ? 
              <Box sx={{ 
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <CircularProgress /> 
              </Box>
              : <>
              <TabPanel value="1">
                { products1.length > 0 &&
                  <Paper sx={{ mb: 3 }}>
                    <Button 
                      sx={{
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                      }}
                      variant="text"
                      onClick={handleBackwardClick}
                    >
                      <ArrowBackIosNewIcon sx={{ mr: 1 }}/>
                      {t("backward")}
                    </Button>
                  </Paper>
                }
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap"
                  }}
                >
                {
                  products1.length > 0
                  ? <>
                    {
                      products1.map(p => 
                        <ProductCard 
                          key={p.meta.barcode}
                          product={p}
                          onClick={() => addToBasket(p)}
                        />
                      )
                    }
                    </>
                  : categories.map(c => 
                    <CategoryCard
                      key={c.category}
                      category={c.category}
                      thumbnail={c.thumbnail}
                      onClick={() => handleCategoryClick(c.category)}
                    />)
                }
                </Box>
              </TabPanel>
              <TabPanel value="2" sx={{ p: 0 }}>
                <Box
                  sx={{
                    width: "100%",
                    px: 2,
                    pb: 1,
                    pt: 2,
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Paper sx={{ overflow: "auto", display: "inline-block", mx: "auto" }}>
                    <AlphabeticSearchBar 
                    onChange={handleStartWithChange}
                    value={startWith}
                    />
                  </Paper>
                </Box>
                <Box sx={{ 
                  display: "flex",
                  justifyContent:"space-around",
                  flexWrap: "wrap",
                  mt: 2
                }}>
                  {
                    products2.length > 0 ?
                      products2.map(p => <ProductCard 
                        key={p.meta.barcode}
                        product={p}
                        onClick={() => addToBasket(p)}
                      />) :
                      <Typography 
                        sx={{ textAlign: "center", mt: 2 }}
                        component="div"
                        variant="body2"
                      >{t("noResultMessage")}</Typography>
                  }
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box sx={{ 
                  display: "flex",
                  justifyContent:"space-around",
                  flexWrap: "wrap"
                }}>
                  {
                    products3.length > 0 ?
                      products3.map(p => <ProductCard 
                        key={p.meta.barcode}
                        product={p}
                        onClick={() => addToBasket(p)}
                      />) :
                      <Typography 
                        sx={{ textAlign: "center" }}
                        component="div"
                        variant="body2"
                      >{t("noResultMessage")}</Typography>
                  }
                </Box>
              </TabPanel>
            </>}
          </Box>
      </TabContext>
    </Box>
  );
} 