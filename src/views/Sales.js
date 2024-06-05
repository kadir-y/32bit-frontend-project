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
import { styled } from "@mui/material/styles";
import {
  ManageSearchOutlined as ManageSearchOutlinedIcon,
  FiberManualRecord as FiberManualRecordIcon,
  BackspaceOutlined as BackspaceOutlinedIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { useState, useRef, useEffect } from "react";
import { useFormInput } from "../hooks/useFormInput";
import { useToggle } from "../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput";
import BasicTitleBar from "../components/BasicTitleBar";
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

const NumpadButton = styled(Button)({
  padding: 0,
  minWidth: 0,
  flexGrow: 1,
  height: "3rem",
  fontSize: "1.25rem",
  marginRight: "0.25rem",
  "&:last-child": {
    marginRight: 0
  }
})

const normalizeButton = {
  minWidth: "0 !important",
  minHeight: "0 !important",
  padding: "0",
  margin: "0"
}

const unitSymbols = {
  price: "$",
  mass: "kg",
  piece: "pieces"
} 

function NumpadAndInput(props) {
  const [value, setValue] = useState("");
  const refValue = useRef("");
  const onChange = props.onChange ? props.onChange : () => { };
  const { unit } = props;

  useEffect(() => {
    setValue(() => {
      const symbol = unitSymbols[unit];
      if (unit === "price") return `.00 ${symbol}`;
      else if (unit === "mass") return `.000 ${symbol}`;
      if (unit === "piece") return `0 ${symbol}`;
    });
  }, [unit])

  function handleChange(keyValue) {
    let val = refValue.current;
    if (!Boolean(val) &&
       (keyValue === "decrease" || keyValue === "backspace")
    ) return;
    if (keyValue === "backspace") {
      if (unit === "mass" || unit === "price") {
        val = val.slice(0, -1);
      } else if (unit === "piece") {
        val = val.length === 1 ? "0" : val.slice(0, -1);
      }
      value.slice(0, -1);
    } else if (keyValue === "increase") {
      Boolean(val) || (val = "0");
      if (unit === "piece") {
        val = (parseInt(val) + 1).toString();
      } else if (unit === "mass") {
        val = (parseInt(val) + 1000).toString();
      } else if (unit === "price") {
        val = (parseInt(val) + 100).toString();
      }
    } else if (keyValue === "decrease") {
      if (unit === "piece") {
        val = (parseInt(val) - 1).toString();
      } else if (unit === "mass") {
        val = (parseInt(val) - 1000).toString();
      } else if (unit === "price") {
        val = (parseInt(val) - 100).toString();
      }
    } else if (!(keyValue[0] === "0" && val === "")) {
      val += keyValue;
    }
    val = val < 0 ? "0" : val;
    refValue.current = val;
    if (unit === "mass") {
      switch (val.length) {
        case 0:
          val = ".000";
          break;
        case 1:
          val = ".00" + val;
          break;
        case 2:
          val = ".0" + val;
          break;
        default:
          val = val.slice(0, -3) + "." + val.slice(-3);
      }
    }
    if (unit === "price") {
      switch (val.length) {
        case 0:
          val = ".00"
          break;
        case 1:
          val = ".0" + val
          break;
        default:
          val = val.slice(0, -2) + "." + val.slice(-2);
      }
    }
    val = `${val} ${unitSymbols[unit]}`;
    onChange(val);
    setValue(val);
  };

  return (
    <>
      <Box sx={{
        border: 1,
        borderColor: "grey.500",
        borderRadius: 2,
        height: "3rem",
        lineHeight: "3rem",
        fontSize: "1.25rem",
        my: 1,
        px: 1.5
      }}>{value}</Box>
      <Grid container>
        <Grid item xs={7} sx={{ pr: 1 }}>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange("7")}>7</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("8")}>8</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("9")}>9</NumpadButton>
          </Box>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange("4")}>4</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("5")}>5</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("6")}>6</NumpadButton>
          </Box>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange("1")}>1</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("2")}>2</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("3")}>3</NumpadButton>
          </Box>
          <Box sx={{ display: "flex" }}>
            <NumpadButton variant="contained" onClick={() => handleChange("0")}>0</NumpadButton>
          </Box>
        </Grid>
        <Grid item xs={5} sx={{ pl: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleChange("increase")}
              sx={{ ...normalizeButton, mr: 0.5 }}
            >
              <AddIcon />
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleChange("decrease")}
              sx={{ ...normalizeButton, ml: 0.5, height: "2.5rem"}}
            >
              <RemoveIcon />
            </Button>
          </Box>
          <Button fullWidth variant="contained" sx={{ mb: 1 }} onClick={() => handleChange("00")}>00</Button>
          <Button fullWidth variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleChange("backspace")}>
            <BackspaceOutlinedIcon />
          </Button>
          <Button fullWidth variant="contained" color="primary" sx={{ flexGrow: 1 }}>Devam Et</Button>
        </Grid>
      </Grid>
    </>
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
  const [selectedProduct, setSelectedProduct] = useState(0);
  const fetchCount = useRef(0);
  const {
    props: inputProps
  } = useFormInput({
    label: "Klavyeden Ürün girişi",
    type: "text",
    onChange: handleChange
  });

  function handleProductsItemClick(e, index) {
    setSelectedProduct(index);
  }
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
              <ProductContent />
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
              <List
                subheader={
                  <ListSubheader>Products</ListSubheader>
                }
              >
                <ListItemButton
                  selected={selectedProduct === 0}
                  onClick={e => handleProductsItemClick(e, 0)}
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
              </List>
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
