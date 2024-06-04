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
  ListItemButton,
  ListSubheader,
  Button,
  Divider
} from "@mui/material";
import {
  FiberManualRecord as FiberManualRecordIcon
} from "@mui/icons-material";

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
    id: 1,
    total: "2.00",
    receipNumber: 941282, 
    createdAt: "Jun 4 20:49"
  },
  {
    id: 1,
    total: "3.50",
    receipNumber: 102458, 
    createdAt: "Jun 4 20:30"
  },
  {
    id: 1,
    total: "12.50",
    receipNumber: 349122, 
    createdAt: "Jun 4 20:18"
  },
  {
    id: 1,
    total: "49.00",
    receipNumber: 124921, 
    createdAt: "Jun 4 19:30"
  }
]

function Home () {
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center", px: 2 }}>
      <Grid item xs={11} md={5} sx={{ pr: 1, pt: 3, pb: 2 }}>
        <Paper sx={{
          py: 2,
          px: 7,
          mb: 3
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
            }}>Mağaza Çevrimiçi</Typography>
            <FiberManualRecordIcon color="success" /> 
          </Box>
          <Typography component="div" variant="subtitle2" sx={{ fontWeight: "500" }} >Mağaza No: 1057 (Mobile Demo)</Typography>
          <Typography component="div" variant="subtitle2">Kasa No: (Kasa 1)</Typography>
          <Typography component="div" variant="subtitle2">Kasa Ip No: 10.0.2.16</Typography>
          <Typography component="div" variant="subtitle2">Version: v1.4.75.3</Typography>
        </Paper>
        <Paper elevation={2}>
          <List>
            <ListSubheader>Total Sales</ListSubheader>
            {
              totalSales.map(product =>
                <ListItem>
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
                  <ListItemText>
                    {product.title}
                    {`${product.totalSales} sold`}
                  </ListItemText>
                </ListItem>
              )
            }
            <ListItem>
              <ListItemText></ListItemText>
              <Button>Show More</Button>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={11} md={5} sx={{ pl: 1, pt: 3, pb: 2, }}>
        <Paper elevation={2}>
          <List>
            <ListSubheader>Last Receipts</ListSubheader>
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
                            Show
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
  );
}

export default Home;