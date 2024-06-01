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
  ShoppingCart as ShoppingCartIcon 
} from '@mui/icons-material';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import getFullName from "../../libs/getFullName";

const navigations = [
  {
    label: "Sales",
    path: "/sales",
    icon: <ShoppingCartIcon />
  },
  {
    label: "Return Process",
    icon: <AutorenewIcon />
  },
  {
    label: "Reports",
    icon: <AssignmentIcon />
  },
  {
    label: "Enter Product Directly",
    icon: <StorefrontIcon />
  },
  {
    label: "View Prices",
    path: "/view-prices",
    icon: <LocalOfferIcon />
  },
  {
    label: "Collections",
    icon: <CalculateIcon />
  },
  {
    label: "Other Processes",
    icon: <PostAddIcon />
  },
  {
    label: "www",
    path: "https://32bit.com.tr",
    icon: <TravelExploreIcon />
  }
];  

export default function Menu({ isNavbarOpen }) {
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
      left: isNavbarOpen ? 0 : "-250px"
    }}>
      <ListItem sx={{ mb: 2 }}>
        <ListItemAvatar>
          <Avatar alt={getFullName(user)} src={user.profilePicture} />
        </ListItemAvatar>
        <ListItemText>{getFullName(user)}</ListItemText>
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
      <Divider />
      <ListItem sx={{ mt: 1, alignSelf: "flex-end" }} disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}