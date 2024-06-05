import { 
  Grid,
  Paper,
  Box,
  IconButton,
  Button,
  Typography,
  Tab,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormInput } from "../hooks/useFormInput";
import { useToggle } from "../hooks/useToggle";
import axios from "axios";
import TextInput from "../components/TextInput";
import {
  Pageview as PageviewIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon
} from "@mui/icons-material";

import kitchenImage from "../assets/images/kitchen.jpg"; 
import bookImage from "../assets/images/books.jpg"; 
import beutyImage from "../assets/images/beuty.jpg"; 

const categories = [
  {
    title: "Kitchen",
    image: kitchenImage
  },
  {
    title: "Books",
    image: bookImage
  },
  {
    title: "Beuty",
    image: beutyImage
  }
]

function ProductContent(props) {
  const [value, setValue] = useState("3");
  const { products, ...others } = props;
  function handleChange(e, newValue) {
    setValue(newValue);
  };
  return (
    <TabContext {...others} value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab sx={{ textTransform: "none" }} label="Kategoriler" value="1" />
          <Tab sx={{ textTransform: "none" }} label="Barkodsuz Ürünler" value="2" />
          <Tab sx={{ textTransform: "none" }} label="Ürünler" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1" sx={{display: "flex", justifyContent: "space-between"}}>
        {
          categories.map(category =>
            <Card key={category.title} sx={{ 
                width: "7rem",
                cursor: "pointer",
                "&:hover": { transform: "translateY(-1rem)" },
                transition: "transform 0.3s"
              }}>
              <CardMedia>
                <CardMedia 
                  component="img"
                  alt={category.title}
                  height="100"
                  src={category.image}
                ></CardMedia> 
                <CardContent>
                  <Typography component="span" variant="body2">{category.title}</Typography>
                </CardContent>
              </CardMedia>
            </Card>
          )
        }
      </TabPanel>
      <TabPanel value="2">Item Two</TabPanel>
      <TabPanel value="3">
        {
          products ?
            products.map(p => <Box></Box>) :
            <Typography sx={{ textAlign: "center" }} component="div" variant="body2">Gösterilcek ürün bulunamadı.</Typography>
        }
      </TabPanel>
    </TabContext>
  );
}

export default function SalesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isFetching, toggleIsFetching] = useToggle();
  const [products, setProducts] = useState([]);
  const fetchCount = useRef(0);
  const {
    props: inputProps
  } = useFormInput({
    label: "Klavyeden Ürün girişi",
    type: "text",
    onChange: handleChange
  });

  function handleViewPriceClick() {
    navigate("/view-prices");
  };
  function handleBackwardClick() {
    navigate(-1);
  };
  function fetchProducts() {
    return axios.get(`/api/products?search=${search}`);
  };
  function handleChange(e) {
    if (e.target.value === "") 
    return setProducts([]);
    fetchCount.current++;
    const queue = fetchCount.current;
    const value = e.target.value;
    setSearch(value);
    toggleIsFetching(true);
    fetchProducts()
      .then(res =>  {
        if(queue !== fetchCount.current) return;
        setProducts(res.data.products);
        toggleIsFetching(false);
      })
      .catch(err => {
        toggleIsFetching(false);
        console.error(err);
      });
  };
  
  return(
    <Grid container sx={{ 
      pt: 3, pb: 5,
    }}>
      <Paper sx={{ 
        width: "100%",
        mx: 2,
        mb: 2,
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <IconButton onClick={handleBackwardClick}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography component="span" variant="subtitle1">Satış Belgesi</Typography>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          startIcon={<PageviewIcon />}
          onClick={handleViewPriceClick}>
          Fiyatları Gör
        </Button>
      </Paper>
      <Grid item xs={12} md={4} sx={{ pb: 2, px: 2 }}>
        <Paper
          sx={{
            width: "100%",
            px: 1,
            py: 2
          }}
        >
          <Box>
            <TextInput id="search-input" {...inputProps} />
          </Box>
          <Box sx={{ mt: 1 }}>
            <ProductContent />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} sx={{ pb: 2, px: 0.5 }}>
        <Paper
          sx={{
            width: "100%",
            py: 2
          }}
        >
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} sx={{ pb: 2, px: 2 }}>
        <Paper
          sx={{
            width: "100%",
            py: 2
          }}
        >
        </Paper>
      </Grid>
    </Grid>
  );
}