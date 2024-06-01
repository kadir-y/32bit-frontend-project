import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon, 
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function TopBar({ toggleNavbar }) {
  const { t } = useTranslation("navbar");
  const [anchorElOption, setAnchorElOption] = useState(null);
  const navigate = useNavigate()
  const { logout } = useAuth();

  const options = [{
    label: t("settings"),
    color: "default",
    redirect: "/settings",
    icon: <SettingsIcon />,
  }];

  function handleOpenNavMenu() {
    toggleNavbar();
  };
  function handleCloseOptionMenu({ onClick: callback, redirect } = {}) {
    setAnchorElOption(null);
    callback && callback();
    redirect && navigate(redirect);
  };
  function handleOpenOptionMenu (e) {
    setAnchorElOption(e.currentTarget);
  };
  function handleLogout() {
    logout();
    navigate("/login");
  };
  
  
  return (
    <AppBar color="appBar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            32BIT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            32BIT
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenOptionMenu} sx={{ p: 0 }}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElOption}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElOption)}
              onClose={handleCloseOptionMenu}
            >
              {options.map((option, index) => (
                <MenuItem 
                  key={option.label} 
                  onClick={e => handleCloseOptionMenu(option)}
                >
                  {
                    option.icon && 
                    <ListItemIcon>
                      {option.icon}
                    </ListItemIcon>
                  }
                  <ListItemText>{option.label}</ListItemText>
                </MenuItem>
              ))}
                <MenuItem 
                  onClick={handleLogout}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>{t("logout")}</ListItemText>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}