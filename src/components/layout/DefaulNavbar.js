import { Grid } from "@mui/material";
import Menu from "./Menu";
import TopBar from "./TopBar";
import { useToggle } from "../../hooks/useToggle"

export default function Navbar() {
  const [isOpen, toggle] = useToggle();
  return (
    <Grid container>
      <Grid item xs={12}>
        <TopBar toggle={toggle}/>
      </Grid>
      <Grid item sx={{ position: "relative" }} xs={11} md={3}>
        <Menu isOpen={isOpen}/>
      </Grid>
    </Grid>
  );
}