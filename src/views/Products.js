import { 
  Pagination,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  LinearProgress
} from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useProductsDispatch } from "../hooks/useProducts";
import { useEffect, useRef, useState } from "react";
import { useFormInput } from "../hooks/useFormInput"
import { useTranslation } from "react-i18next";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import TextInput from "../components/TextInput";
import AlphabeticSearchBar from "../components/AlphabeticSearchBar";
import BasicTitleBar from "../components/BasicTitleBar";

function Products () {
  const { t } = useTranslation("products");
  const [sortBy, setSortBy] = useState("AZ");
  const [totalPage, setTotalPage] = useState(0);
  const [isFetching, toggleIsFetching] = useState(true); 
  const [search, setSearch] = useState("");
  const [startWith, setStartWith] = useState("");
  const products = useProducts();
  const productsDispatch = useProductsDispatch();
  const fetchCount = useRef(0);
  const { props: searchInputProps } = useFormInput({
    label: t("searchPlaceholder"),
    type: "text",
    onChange: handleSearchChange
  });
  const limit = useRef(20);
  useEffect(() => {
    const queue = fetchCount.current++;
    let ignore = false
    axios(`/products?page=1&limit=${limit.current}`)
    .then(res => {
      if (fetchCount.current === queue || ignore) return;
      const { totalPage, products } = res.data;
      productsDispatch({
        type: "changed",
        products
      });
      setTotalPage(totalPage);
      toggleIsFetching(false);
    })
    .catch(err => console.error(err));
    return () => ignore = true;
  }, [productsDispatch]);
  function handleSortByChange(e) {
    const value = e.target.value
    fetchCount.current++;
    const queue = fetchCount.current;
    setSortBy(value);
    toggleIsFetching(true);
    axios(`/products?page=1&limit=${limit.current}&search=${search}&sort=${value}&startWith=${startWith}`)
    .then(res => {
      if (queue !== fetchCount.current) return;
      const { totalPage, products } = res.data;
      productsDispatch({
        type: "changed",
        products
      });
      setTotalPage(totalPage);
      toggleIsFetching(false);
    }).catch(err => console.error(err));
  };
  function handleSearchChange(e) {
    const value = e.target.value;
    fetchCount.current++;
    const queue = fetchCount.current;
    setStartWith("");
    setSearch(value);
    toggleIsFetching(true);
    axios(`/products?page=1&limit=${limit.current}&search=${value}&sort=${sortBy}`)
    .then(res => {
      if (queue !== fetchCount.current) return;
      const { totalPage, products } = res.data;
      productsDispatch({
        type: "changed",
        products
      });
      setTotalPage(totalPage);
      toggleIsFetching(false);
    })
    .catch(err => console.error(err));
  };
  function handlePageChange(event, value) {
    fetchCount.current++;
    const queue = fetchCount.current;
    axios(`/products?page=${value}&limit=${limit.current}&search=${search}&startWith=${startWith}`)
    .then(res => {
      if (queue !== fetchCount.current) return;
      const { totalPage, products } = res.data;
      productsDispatch({
        type: "changed",
        products
      });
      setTotalPage(totalPage);
    })
    .catch(err => console.error(err));
  };
  function handleStartWithChange(e) {
    const value = e.target.value;
    fetchCount.current++;
    const queue = fetchCount.current;
    setStartWith(value);
    toggleIsFetching(true);
    axios(`/products?page=1&limit=${limit.current}&search=${search}&sort=${sortBy}&startWith=${value}`)
    .then(res => {
      if (queue !== fetchCount.current) return;
      const { totalPage, products } = res.data;
      productsDispatch({
        type: "changed",
        products
      });
      setTotalPage(totalPage);
      toggleIsFetching(false);
    })
    .catch(err => console.error(err));
  }

  return (
    <>
      <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
        <BasicTitleBar />
      </Box>
      <Paper sx={{
        width: "90%",
        mx: "auto",
        mt: 2,
        px: 1,
        pt: 2, 
        pb: 1, 
        display: "flex"
      }}>
        <Box sx={{ flexGrow: { xs: 1, sm: 0 }, mr: 1 }}>
          <FormControl
            size="small"
            sx={{
              width: "8rem"
            }}
          >
            <InputLabel id="sort-label">{t("sortByPlaceholder")}</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortBy}
              label={t("sortByPlaceholder")}
              onChange={handleSortByChange}
            >
              <MenuItem value="AZ">{t("sortByOptions.alphabeticAZ")}</MenuItem>
              <MenuItem value="ZA">{t("sortByOptions.alphabeticZA")}</MenuItem>
              <MenuItem value="expensive">{t("sortByOptions.expensive")}</MenuItem>
              <MenuItem value="Cheap">{t("sortByOptions.cheap")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography 
          sx={{ 
            display: { xs: "none", sm: "block", lg: "none" },
            flexGrow: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}
          component="h1"
          variant="h6"
        >{t("viewProducts")}</Typography>
        <Paper sx={{
            display: { xs: "none", lg: "block" },
            mx: "auto",
            overflow: "auto",
            backgroundColor: "transparent",
          }}
        >
          <AlphabeticSearchBar
            onChange={handleStartWithChange}
            value={startWith}
          />
        </Paper>
        <TextInput 
          id="search-input"
          {...searchInputProps}
          sx={{
            width: "15rem",
            ml: 1
          }}
          size="small"
        />
      </Paper>
      <Box
        sx={{
          maxWidth: "90%",
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          mt: 1
        }}
      >
        <Paper sx={{ display: { xs: "block", lg: "none", overflow: "auto" } }}>
          <AlphabeticSearchBar
            onChange={handleStartWithChange}
            value={startWith}
          />
        </Paper>
      </Box>
      <Box sx={{ 
          paddingBottom: { xs: "9rem", sm: "8rem", md: "5rem" },
          pt: 3,
          mx: "auto",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          width: "90%"
        }}
      >
        {products.map(product => 
          <ProductCard 
            key={product.meta.barcode}
            product={product}
            sx={{
              mb: 2,
              mx: 0.75,
              width: "12rem"
            }}
          />)}
      </Box>
      <Box>
        <Paper
          sx={{ 
            position: "fixed",
            bottom: "1rem",
            left: { md: "50%", xs: "1rem" },
            transform: { md: "translate(-50%)" },
            maxWidth: "calc(100% - 12rem)",
          }}
        > 
        {
          isFetching ? 
            <Box sx={{ textAlign: "center", width: "10rem", pt: 1 }}>
              <Typography variant="body1" component="p" sx={{ mb: 1 }}>Loading...</Typography>
              <LinearProgress />
            </Box>
          :
          <Pagination 
            sx={{ 
              p: 1,
            }}
            count={totalPage}
            siblingCount={1}
            boundaryCount={1}
            defaultPage={1}
            disabled={isFetching}
            onChange={handlePageChange}
            color="primary"
          />
        }
        </Paper>
      </Box>
    </>
  );
}

export default Products;