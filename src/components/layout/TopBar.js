import { useState } from "react";
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

const options = [{
  label: "Settings",
  color: "default",
  redirect: "/settings",
  icon: <SettingsIcon />,
}, {
  label: "Logout",
  color: "danger",
  onClick: () => {
    console.log("Logout");
  },
  icon: <LogoutIcon />
}];

export default function TopBar() {
  const [anchorElOption, setAnchorElOption] = useState(null);
  const navigate = useNavigate()
  
  function handleOpenNavMenu() {
    console.log("Open Nav Menu");
  }
  function handleCloseOptionMenu({ onClick: callback, redirect } = {}) {
    setAnchorElOption(null);
    callback && callback();
    redirect && navigate(redirect);
  }
  function handleOpenOptionMenu (e) {
    setAnchorElOption(e.currentTarget);
  };
  
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            32BIT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
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
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElOption}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElOption)}
              onClose={handleCloseOptionMenu}
            >
              {options.map((option, index) => (
                <MenuItem 
                  color="danger"
                  key={option.label} 
                  onClick={e => handleCloseOptionMenu(option)}
                >
                  {
                    option.icon && 
                    <ListItemIcon>
                      {option.icon}
                    </ListItemIcon>
                  }
                  <ListItemText color="">{option.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}