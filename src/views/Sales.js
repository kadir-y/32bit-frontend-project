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
  Divider,
  ListItemText,
  ListItem
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
import { useState, useRef } from "react";
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

function NumpadAndButton(props) {
  const [value, setValue] = useState("");
  const onChange = props.onChange ? props.onChange : () => { };
  const { unit, isPrice } = props;

  function handleChange(keyValue) {
    let val = value;
    if (keyValue === "backspace") {
    } else if (keyValue === "increase") {
    } else if (keyValue === "decrease") {
    } else {
    }
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
            {(isPrice && unit === "count") && <NumpadButton variant="contained" onClick={() => handleChange(".")}>.</NumpadButton>}
          </Box>
        </Grid>
        <Grid item xs={5} sx={{ pl: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleChange("increase")}
              sx={{ mr: 0.5 }}
            >
              <AddIcon />
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleChange("decrease")}
              sx={{ ml: 0.5 }}
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
        pt: 2,
        px: 1,
        overflow: "auto"
      }}>
        <Grid item xs={12} md={4} lg={5} sx={{ px: 1 }}>
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
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <List
              sx={{
                overflow: "auto",
                height: "calc(100% - 5rem)",
              }}
              subheader={
                <ListSubheader component="div" id="products-list-subheader">
                  Products
                </ListSubheader>
              }
            >
              <ListItem>
                <ListItemText>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography component="span">
                      Product Name
                    </Typography>
                    <Typography>23.24$</Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            </List>
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
        <Grid item xs={12} md={4} lg={3} sx={{ px: 1 }} elevation={5}>
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
                <NumpadAndButton />
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
