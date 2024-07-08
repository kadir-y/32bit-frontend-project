import { 
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { useBasketItems, useBasketItemsDispatch } from "../hooks/useBasket";
import { useCampaign } from "../hooks/useCampaign";
import campaignIsAvailable from "../libs/campaignIsAvailable";
import makeDiscount from "../libs/makeDiscount";
import { useEffect, useCallback, useRef } from "react";

export default function CampaignItem ({ campaign }) {
  const basketItems = useBasketItems();
  const basketItemsDispatch = useBasketItemsDispatch();
  const { addCampaign, removeCampaign, includes } = useCampaign();
  const { isAvailable, filteredItems } = campaignIsAvailable(campaign, basketItems);
  let applied = useRef(false);
  const isIncludes = includes(campaign.id);
  function applyCampaign () {
    applied.current = true
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
  };
  const unapplyCampaign = useCallback(function () {
    applied.current = false;
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
  }, [campaign, basketItemsDispatch, removeCampaign, filteredItems]);
  
  /* dont split this block */
  function toggleCampaign() {
    if (isIncludes) {
      unapplyCampaign();
    } else {
      applyCampaign();
    }
  };
  /* */

  useEffect(() => {
    if (isIncludes && !isAvailable) {
      unapplyCampaign();
    }
    return () => {
      if (isIncludes && applied.current) {
        unapplyCampaign();
      };
    }
  }, [basketItems, isAvailable, isIncludes, unapplyCampaign]);

  return (
    isAvailable &&
    <Box onClick={toggleCampaign}>
      <Divider />
      <ListItemButton disabled={false}>
        <ListItemText>
          <Typography component="div" variant="body1">
            {campaign.title}
            { isIncludes &&
              <i>&nbsp;&nbsp;(applied)</i>
            }
          </Typography>
          <Typography component="div" variant="body2">{campaign.description}</Typography>
        </ListItemText>
      </ListItemButton>
    </Box>
  );
} 