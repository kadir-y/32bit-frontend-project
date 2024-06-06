import { useState, useEffect, useRef } from "react";
import axios from "../axios"
import {
  Paper,
  Box,
  Button,
  Typography,
  Tab
} from "@mui/material";
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';
import AlphabeticSearchBar from "../components/AlphabeticSearchBar";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import {
  ArrowBackIosNew as  ArrowBackIosNewIcon
} from '@mui/icons-material';
import kitchenImage from "../assets/images/kitchen.jpg";
import bookImage from "../assets/images/books.jpg";
import beutyImage from "../assets/images/beuty.jpg";

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
]

export default function ProductSearchSection({ addToBasket, products }) {
  const [startWith, setStartWith] = useState("");
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [value, setValue] = useState("1");
  const fetchCount = useRef(0);

  useEffect(() => {
    if (products.length > 0) {
      setValue("3");
    }
  }, [products]);

  function handleChange(e, newValue) {
    setValue(newValue);
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

  function handleStartWithChange(e) {
    const nStartWith = e.target.value;
    setStartWith(nStartWith);
    fetchCount.current++;
    const queue = fetchCount.current;
    fetchProducts({ startWith: nStartWith })
      .then(res => {
        if (queue !== fetchCount.current) return;
        setProducts2(res.data.products);
      })
      .catch(err => console.error(err));
  };
  function handleCategoryClick(category) {
    fetchCount.current++;
    const queue = fetchCount.current;
    fetchProducts({ category })
      .then(res => {
        if (queue !== fetchCount.current) return;
        setProducts1(res.data.products);
      })
      .catch(err => console.error(err));
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab sx={{ textTransform: "none" }} label="Kategoriler" value="1" />
          <Tab sx={{ textTransform: "none" }} label="Barkodsuz Ürünler" value="2" />
          <Tab sx={{ textTransform: "none" }} label="Ürünler" value="3" />
        </TabList>
      </Box>
      <Box sx={{
        overflow: "auto",
        height: "calc(100vh - 18.1rem)"
      }}>
        <TabPanel value="1">
          { products1.length > 0 &&
            <Paper sx={{
              mb: 3
            }}>
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
                Backward
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
                >Gösterilecek sonuç bulunamadı.</Typography>
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
              products.length > 0 ?
                products.map(p => <ProductCard 
                  key={p.meta.barcode}
                  product={p}
                  onClick={() => addToBasket(p)}
                />) :
                <Typography 
                  sx={{ textAlign: "center" }}
                  component="div"
                  variant="body2"
                >Gösterilcek ürün bulunamadı.</Typography>
            }
          </Box>
        </TabPanel>
      </Box>
    </TabContext>
  );
}