import { 
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useBasketItems, useBasketItemsDispatch } from "../hooks/useBasket";
import { useCampaign } from "../hooks/useCampaign";
import campaignIsAvailable from "../libs/campaignIsAvailable";
import makeDiscount from "../libs/makeDiscount";

export default function CampaignItem ({ campaign }) {
  const {t} = useTranslation("sales")
  const basketItems = useBasketItems();
  const basketItemsDispatch = useBasketItemsDispatch();
  const { addCampaign, removeCampaign, includes } = useCampaign();
  const { isAvailable, filteredItems } = campaignIsAvailable(campaign, basketItems);
  const isIncludes = includes(campaign.id);
  
  function applyCampaign () {
    addCampaign(campaign);
    filteredItems.forEach(item => {
      const totalPrice = makeDiscount(item.totalPrice, campaign.amount);
      basketItemsDispatch({
        type: "changed",
        product: {
          ...item,
          totalPrice,
          discount: campaign.amount
        }
      });
    });
  }
  function unapplyCampaign () {
    removeCampaign(campaign.id);
    filteredItems.forEach(item => {
      basketItemsDispatch({
        type: "changed",
        product: {
          ...item,
          totalPrice: item.subtotalPrice,
          discount: undefined
        }
      });
    });
  }
  
  /* dont split this block */
  function toggleCampaign() {
    if (!isAvailable) return;
    if (isIncludes) {
      unapplyCampaign();
    } else {
      applyCampaign();
    }
  };

  return (
    <Box>
      <Divider />
      <ListItemButton sx={{ opacity: isAvailable ? 1 : 0.6 }} disabled={!isAvailable} onClick={toggleCampaign}>
        <ListItemText>
          <Typography component="div" variant="body1">
            {campaign.title}
            { !isAvailable && <i>&nbsp;&nbsp;({t("notApplicable")})</i> }
            { isIncludes && <i>&nbsp;&nbsp;({t("applied")})</i> }
          </Typography>
          <Typography component="div" variant="body2">{campaign.description}</Typography>
        </ListItemText>
      </ListItemButton>
    </Box>
  );
} 