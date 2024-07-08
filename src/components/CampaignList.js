import {
  List,
  ListSubheader,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CampaignItem from "./CampaignItem";


const campaigns = [
  {
    id: 0,
    title: "Grocery %20",
    description: "200$ ve üzeri alışveriş",
    filter: "category=groceries",
    condition: "totalPrice>100",
    amount: "%20"
  }
];

export default function CampaignList () {
  const { t } = useTranslation("sales");
  return (
    <List subheader={
      <ListSubheader>{t("campaignListHeader")}</ListSubheader>
    }> 
      {
        campaigns.length > 0 ?
        campaigns.map((campaign, index) => <CampaignItem key={index} campaign={campaign} />) :
        <Typography variant="subtitle2" sx={{ px: 2 }}>{t("availableCampaignsNotFound")}</Typography>
      }
    </List>
  )
}