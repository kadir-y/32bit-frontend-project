import {
  Grid,
  Box, 
  Button
} from "@mui/material";

import { ShoppingCart } from '@mui/icons-material';

function Home () {
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={11} sm={10} md={5} lg={4} xlg={3}>
        <Box>
          <Button 
            variant="outlined"
            startIcon={<ShoppingCart />}
            sx={{ width: "100%" }}
          >Satış</Button>
        </Box>
      </Grid>
      <Grid item xs={11} sm={10} md={5} lg={4} xlg={3}>
      </Grid>
    </Grid>
  );
}

export default Home;