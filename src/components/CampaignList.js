import {
  List,
  ListSubheader,
  Typography
} from "@mui/material";
import CampaignItem from "./CampaignItem"

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
  return (
    <List subheader={
      <ListSubheader>Uygulanabilir Kampanyalar</ListSubheader>
    }> 
      {
        campaigns.length > 0 ?
        campaigns.map((campaign, index) => <CampaignItem key={index} campaign={campaign} />): 
        <Typography variant="subtitle2" sx={{ px: 2 }}>Uygulanbilir bir kampanya bulunamadı</Typography>
      }
    </List>
  )
}