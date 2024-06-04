import { 
  Pagination,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  LinearProgress
} from "@mui/material";

import { useProducts } from "../hooks/useProducts";
import { useProductsDispatch } from "../hooks/useProducts";
import { useEffect, useRef, useState } from "react";
import { useFormInput } from "../hooks/useFormInput"
import axios from "axios";

import TextInput from "../components/TextInput";
import AlphabeticSearchBar from "../components/AlphabeticSearchBar";

function Products () {
  const [sortBy, setSortBy] = useState("Alphabetic A-Z");
  const [totalPage, setTotalPage] = useState(0);
  const [isFetching, toggleIsFetching] = useState(true); 
  const [search, setSearch] = useState("");
  const [startWith, setStartWith] = useState("");
  const products = useProducts();
  const productsDispatch = useProductsDispatch();
  const fetchCount = useRef(0);
  const { props: searchInputProps } = useFormInput({
    label: "Search",
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
    const value = e.target.value
    fetchCount.current++;
    const queue = fetchCount.current;
    setSearch(value);
    toggleIsFetching(true);
    axios(`/products?page=1&limit=${limit.current}&search=${value}&sort=${sortBy}&startWith=${startWith}`)
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
    fetchCount.current++
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
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortBy}
              label="Sort by"
              onChange={handleSortByChange}
            >
              <MenuItem value="Alphabetic A-Z">Alphabetic A-Z</MenuItem>
              <MenuItem value="Alphabetic Z-A">Alphabetic Z-A</MenuItem>
              <MenuItem value="Price Expensive">Price Expensive</MenuItem>
              <MenuItem value="Price Cheap">Price Cheap</MenuItem>
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
        >
          View Products
        </Typography>

        <AlphabeticSearchBar sx={{
            width: "42rem",
            mx: "auto",
            display: { xs: "none", lg: "block" }
          }}
          onChange={handleStartWithChange}
          value={startWith}
        />
        
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
      <AlphabeticSearchBar sx={{
          width: "90%",
          mt: 1,
          mx: "auto",
          display: { xs: "block", lg: "none" },
          overflow: "hidden",
        }}
        onChange={handleStartWithChange}
        search={search}
      />
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
        {
          products.map(p => {
            return (
            <Card sx={{ width: "15rem", mb: 2, mx: 1, float: "left" }} key={p.id}>
              <CardMedia 
                component="img"
                alt={p.title}
                height="150"
                src={p.thumbnail}
              ></CardMedia>  
              <CardContent>
              <Typography sx={{  
                  width: "100%",
                  overflow: "hidden !important",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  mb: 0
                }} 
                gutterBottom 
                variant="h6" 
                component="div"
              >{p.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize", mb: 1.5 }}>{p.category}</Typography>
              <Typography variant="body2" color="text.secondary">{p.price}$</Typography>
              </CardContent>
            </Card>);
          })
        }
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