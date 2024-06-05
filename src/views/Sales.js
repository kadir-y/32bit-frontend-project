import { useState, useRef } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Tab,
  Card,
  CardContent,
  CardMedia,
  List,
  ListSubheader,
  ListItemText,
  ListItemButton
} from "@mui/material";
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';
import {
  ManageSearchOutlined as ManageSearchOutlinedIcon,
  FiberManualRecord as FiberManualRecordIcon
} from '@mui/icons-material';
import { useFormInput } from "../hooks/useFormInput";
import { useToggle } from "../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput";
import BasicTitleBar from "../components/BasicTitleBar";
import NumpadAndInput from "../components/NumpadAndInput";
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

function SearchProductSection(props) {
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
      <TabPanel
        value="1"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap"
        }}>
        {
          categories.map(category =>
            <Card key={category.title} sx={{
              width: "7rem",
              cursor: "pointer",
              "&:hover": { transform: "translateY(-1rem)" },
              transition: "transform 0.3s",
              mb: 2
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

function Footer() {
  return (
    <Paper sx={{ px: 2, py: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="body1">SATICI/MÜŞTERİ</Typography>
        <Typography component="span" variant="body2">SATIŞ BELGESİ</Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Ingenico
          <FiberManualRecordIcon color="error" />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="body1">Merkeze Gönderilecek: 0</Typography>
        <Typography component="span" variant="body2">1057/Haz. 5</Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Mağaza Çevrimiçi
          <FiberManualRecordIcon color="success" />
        </Typography>
      </Box>
    </Paper>
  );
}

function ProductList () {
  const [selectedProduct, setSelectedProduct] = useState(0);
  function handleProductItemClick(e, index) {
    setSelectedProduct(index);
  };
  return (
    <List
      subheader={
        <ListSubheader>Products</ListSubheader>
      }
    >
      {
        [0, 1, 2].map(i => 
          <ProductItem
            key={i}
            index={i}
            selectedProduct={selectedProduct}
            handleProductItemClick={handleProductItemClick}
          />
        )
      }
    </List>
  );
}

function ProductItem({ index, product, selectedProduct, handleProductItemClick }) {
  return (
    <ListItemButton
      selected={selectedProduct === index}
      onClick={e => handleProductItemClick(e, index)}
    >
      <ListItemText>
        <Box sx={{ display: "flex", flexWrap: 1, justifyContent: "space-between" }}>
          <Typography 
            component="span"
            variant="body2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)" }}
          >Product</Typography>
          <Typography 
            component="span"
            variant="body2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)" }}
          >%18 KDV</Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: 1, justifyContent: "space-between" }}>
          <Typography 
            component="span"
            variant="subtitle2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)" }}
          >Kitchen</Typography>
          <Typography 
            component="span"
            variant="subtitle2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)" }}
          >15$</Typography>
        </Box>
      </ListItemText>
    </ListItemButton>
  );
}

const TypographyStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden"
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
      .then(res => {
        if (queue !== fetchCount.current) return;
        setProducts(res.data.products);
        toggleIsFetching(false);
      })
      .catch(err => {
        toggleIsFetching(false);
        console.error(err);
      });
  };

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
              height: "100%",
              px: 1,
              py: 1
            }}
          >
            <Box>
              <TextInput id="search-input" {...inputProps} />
            </Box>
            <Box sx={{ mt: 1 }}>
              <SearchProductSection />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ px: { md: 1 } }}>
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "auto",
            }}
            elevation={4}
          >
            <Box sx={{
              height: "cal(100% - 9.5rem)",
              width: "100%",
              overflow: "auto"
            }}>
              <ProductList />
            </Box>

            <Box sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}>
              <Box sx={{
                width: "100%",
                px: 2,
                py: 1,
                bgcolor: "info.main",
                color: "white"
              }}>
                <Typography component="span" variant="body1">
                  Ara Toplam:&nbsp;&nbsp;&nbsp;260.10$
                </Typography>
              </Box>
              <Box sx={{
                width: "100%",
                px: 2,
                pb: 1,
                pt: 1,
                bgcolor: "primary.main",
                color: "white"
              }}>
                <Typography component="span" variant="body1">
                  Toplam Tutar:&nbsp;&nbsp;&nbsp;240.10$
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3} sx={{ pl: { md: 1 } }}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "100%",
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
                  <Button fullWidth sx={{ mr: 0.5 }} color="error" variant="outlined">
                    SATIR SİL
                  </Button>
                  <Button fullWidth sx={{ ml: 0.5 }} color="error" variant="contained">
                    BELGE İPTAL
                  </Button>
                </Box>
                <Button fullWidth variant="contained" color="success">Kampanyalar</Button>
              </Box>
              <Box>
                <NumpadAndInput unit="mass" />
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
