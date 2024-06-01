import {
  Grid, Box
} from "@mui/material";
import WidedNavbar from "../components/layout/WidedNavbar";
import { useToggle } from "../hooks/useToggle"

function Home () {
  const [isNavbarOpen, toggleNavbar] = useToggle();
  return (
    <>
      <WidedNavbar isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar}/>
      <Grid container sx={{ display: "flex", justifyContent: "end" }}>
        <Box
          sx={{
            width: { xs: "100%", md: isNavbarOpen ? "calc(100% - 250px)" : "100%" },
            height: "2000px",
            marginTop: { xs: "56px", sm: "64px" }
          }}
        ></Box>
      </Grid>
    </>
  );
}

export default Home;