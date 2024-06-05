import { 
  Paper,
  Grid,
  Typography,
  Box,
  ListItemAvatar,
  ListItem,
  List,
  Avatar,
  ListItemText,
  ListSubheader,
  Button,
  Divider
} from "@mui/material";
import {
  FiberManualRecord as FiberManualRecordIcon
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToggle } from "../hooks/useToggle"
import { useWindowSize } from "../hooks/useWindowSize";
import axios from "../axios";
import WidedNavbar from "../components/layout/WidedNavbar";

const totalSales = [
  {
    id: 1,
    title: "Bread",
    totalSales: "157 units",
    thumbnail: "https://w1.pngwing.com/pngs/157/772/png-transparent-graham-bread-bread-sourdough-bakery-small-bread-vienna-bread-stuffing-rye-bread-white-bread-thumbnail.png"
  },
  {
    id: 2,
    title: "Aragula",
    totalSales: "5kg",
    thumbnail: "https://w7.pngwing.com/pngs/452/103/png-transparent-arugula-vegetable-salad-spinach-organic-food-vegetable-leaf-vegetable-cheese-tomato-thumbnail.png"
  },
  {
    id: 3,
    title: "Leek",
    totalSales: "10kg sold",
    thumbnail: "https://w7.pngwing.com/pngs/429/503/png-transparent-allium-fistulosum-vegetarian-cuisine-welsh-cuisine-leek-scallion-spring-onion-food-leek-scallion-thumbnail.png"
  },
  {
    id: 4,
    title: "Nutella",
    totalSales: "125 units",
    thumbnail: "https://w7.pngwing.com/pngs/408/555/png-transparent-kinder-chocolate-chocolate-spread-nutella-hazelnut-chocolate-peanut-butter-bread-skimmed-milk-thumbnail.png"
  },
  {
    id: 5,
    title: "Banana",
    totalSales: "26kg",
    thumbnail: "https://w7.pngwing.com/pngs/61/775/png-transparent-banana-fruit-orange-banana-latest-version-2018-natural-foods-food-superfood-thumbnail.png"
  }
]

const receipts = [
  {
    id: 1,
    total: "125.00",
    receipNumber: 123503,
    createdAt: "Jun 4 21:11"
  },
  {
    id: 2,
    total: "26.40",
    receipNumber: 931203, 
    createdAt: "Jun 4 21:02"
  },
  {
    id: 3,
    total: "2.00",
    receipNumber: 941282, 
    createdAt: "Jun 4 20:49"
  },
  {
    id: 4,
    total: "3.50",
    receipNumber: 102458, 
    createdAt: "Jun 4 20:30"
  },
  {
    id: 5,
    total: "12.50",
    receipNumber: 349122, 
    createdAt: "Jun 4 20:18"
  },
  {
    id: 6,
    total: "49.00",
    receipNumber: 124921, 
    createdAt: "Jun 4 19:30"
  }
]

function Home () {
  const windowSize = useWindowSize();
  const [isNavbarOpen, toggleNavbar] = useToggle(windowSize.width > 900);
  const [storeInfo, setStoreInfo] = useState({
    number: "",
    cashRegisterIp: "",
    cashRegisterNumber: ""
  })
  const [appVersion, setAppVersion] = useState("")
  async function getStoreInfo() {
    return axios.get("/store-info");
  };
  async function getAppVersion() {
    return axios.get("/version");
  };
  useEffect(() => {
    let ignore = false;
    getStoreInfo()
      .then(res => {
        if(ignore) return;
        setStoreInfo(res.data.info); 
      })
      .catch(err => console.error(err));
    getAppVersion()
    .then(res => {
      if(ignore) return; 
      setAppVersion(res.data.version); 
    })
    .catch(err => console.error(err));
    return () => ignore = true;
  }, [])
  const { t } = useTranslation("home");
  return (
    <>
      <WidedNavbar isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar}/>
      <Grid container sx={{ display: "flex", justifyContent: isNavbarOpen ? "end" : "center" }}>
        <Box
          sx={{
            width: { xs: "100%", md: isNavbarOpen ? "calc(100% - 250px)" : "100%" },
            marginTop: { xs: "56px", sm: "64px" },
          }}
        >
      <Grid container sx={{ display: "flex", justifyContent: "center", pb: 8 }}>
        <Grid item xs={11} md={5} sx={{ pt: 3, pb: 2, px: 2 }}>
          <Paper sx={{
            py: 2,
            px: 7,
            mb: 1
          }}
          elevation={4}
          >
            <Box component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" sx={{ 
                mr: 0.5,
              }}>{t("info.storeOnlineMessage")}</Typography>
              <FiberManualRecordIcon color="success" /> 
            </Box>
            <Typography component="div" variant="subtitle2" sx={{ fontWeight: "500" }} >{`${t("info.storeNumber")}: ${storeInfo.number}` }</Typography>
            <Typography component="div" variant="subtitle2">{`${t("info.cashRegisterNumber")}: ${storeInfo.cashRegisterNumber}`}</Typography>
            <Typography component="div" variant="subtitle2">{`${t("info.cashRegisterIp")}: ${storeInfo.cashRegisterIp}`}</Typography>
            <Typography component="div" variant="subtitle2">{`${t("info.version")}: ${appVersion}`}</Typography>
          </Paper>
          <Paper elevation={2}>
            <List>
              <ListSubheader>{t("totalSales")}</ListSubheader>
              {
                totalSales.map(product =>
                  <ListItem key={product.title}>
                    <ListItemAvatar>
                      <Avatar
                        alt={product.title}
                        src={product.thumbnail} 
                        variant="rounded"
                        sx={{
                          backgroundColor: "white"
                        }} 
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.title}
                      secondary={`${product.totalSales} sold`}
                    />
                  </ListItem>
                )
              }
              <ListItem>
                <ListItemText></ListItemText>
                <Button>{t("showMore")}</Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={11} md={5} sx={{ pt: 3, pb: 2, px: 2 }}>
          <Paper elevation={2}>
            <List>
              <ListSubheader>{t("lastReceipts")}</ListSubheader>
              {
                receipts.map(receipt =>
                  <Box key={receipt.receipNumber}>
                    <Divider />
                    <ListItem>
                      <ListItemText>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography component="span">
                            {receipt.receipNumber}
                          </Typography>
                          <Typography>
                            {receipt.createdAt}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography component="span">
                            {`${receipt.total}$`}
                          </Typography>
                            <Button color="primary">
                              {t("show")}
                            </Button>
                        </Box>
                      </ListItemText>
                    </ListItem>
                  </Box>
                )
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
      </Box>
      </Grid>
    </>
  );
}

export default Home;