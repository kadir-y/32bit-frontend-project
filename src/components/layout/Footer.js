import {
  Typography,
  Paper,
  Box
} from "@mui/material"
import {
  FiberManualRecord as FiberManualRecordIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("sales");
  return (
    <Paper sx={{ px: 2, py: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography component="span" variant="body1">{t("seller/customer")}</Typography>
        <Typography component="span" variant="body2">{t("salesDocument")}</Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Ingenico
          <FiberManualRecordIcon color="error" />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography component="span" variant="body1">{t("willBeSentToCenter")}: 0</Typography>
        <Typography component="span" variant="body2">1057/Haz. 5</Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          { t("storeStatus") }
          <FiberManualRecordIcon color="success" />
        </Typography>
      </Box>
    </Paper>
  );
}