import { 
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemIcon,
  ListItemButton
} from "@mui/material";
import { 
  Logout as LogoutIcon,
  TravelExplore as TravelExploreIcon,
  PostAdd as PostAddIcon,
  Calculate as CalculateIcon,
  LocalOffer as LocalOfferIcon,
  Storefront as StorefrontIcon,
  Assignment as AssignmentIcon,
  Autorenew as AutorenewIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon 
} from '@mui/icons-material';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import getFullName from "../../libs/getFullName";
import { useTranslation } from "react-i18next";
  

export default function Menu({ isNavbarOpen }) {
  const { t } = useTranslation("navbar");
  const navigations = [
    {
      label: t("home"),
      path: "/",
      icon: <HomeIcon />
    },
    {
      label: t("sales"),
      path: "/sales",
      icon: <ShoppingCartIcon />
    },
    {
      label: t("returnProcess"),
      icon: <AutorenewIcon />
    },
    {
      label: t("reports"),
      icon: <AssignmentIcon />
    },
    {
      label: t("enterProductDirectly"),
      icon: <StorefrontIcon />
    },
    {
      label: t("viewPrices"),
      path: "/view-prices",
      icon: <LocalOfferIcon />
    },
    {
      label: t("collections"),
      icon: <CalculateIcon />
    },
    {
      label: t("otherProcesses"),
      icon: <PostAddIcon />
    },
    {
      label: t("www"),
      path: "https://32bit.com.tr",
      icon: <TravelExploreIcon />
    }
  ];
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleNavigate (path) {
    if (path.includes("http")) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    }
  };
  function handleLogout() {
    logout();
    navigate("/login");
  };
  return (
    <List sx={{
      height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
      width: "250px",
      bgcolor: "appBar",
      position: "fixed",
      display: "flex",
      flexDirection: "column",
      top: { xs: "56px", sm: "64px" },
      left: isNavbarOpen ? 0 : "-250px",
      zIndex: 2
    }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={getFullName(user)} src={user.profilePicture} />
        </ListItemAvatar>
        <ListItemText>{getFullName(user)}</ListItemText>
      </ListItem>
      <ListItem sx={{ mt: 1, mb: 1, alignSelf: "flex-end" }} disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>{t("logout")}</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
      {
        navigations.map((n, index) => (
          <ListItem key={index} onClick={() => handleNavigate(n.path)} disablePadding>
            <ListItemButton>
              <ListItemIcon>{n.icon}</ListItemIcon>
              <ListItemText>{n.label}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  );
}