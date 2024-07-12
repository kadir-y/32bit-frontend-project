import {
  Box,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
import normalizePrice from "../libs/priceNormalizer"

export default function PaymentPriceDisplay(props) {
  const { t } = useTranslation("sales");
  const amountPaid = normalizePrice(props.amountPaid);
  const remainingAmount = normalizePrice(props.remainingAmount);
  const changeAmount = normalizePrice(props.changeAmount)
  return (
    <Box sx={{
      borderRadius: 2,
      overflow: "hidden"
    }}>
      <Box sx={{
        px: 2,
        py: 1,
        bgcolor: "info.main",
        color: "white",
      }}>
        <Box sx={{ display: "flex" }}>
          <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
            {t("paymentSummaryHeader")} 
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        px: 2,
        py: 1,
        bgcolor: "primary.main",
        color: "white",
      }}>
        <Box sx={{ display: "flex" }}>
          <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
            {t("amountPaid")} 
          </Typography>
          <Typography component="span" variant="subtitle2">
            {amountPaid} $
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        width: "100%",
        px: 2,
        pb: 2,
        pt: 1,
        bgcolor: "primary.main",
        color: "#fff"
      }}>
        <Box sx={{ display: "flex" }}>
          <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
            {t("remainingAmount")}
          </Typography>
          <Typography component="span" variant="subtitle2">
            {remainingAmount} $
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        width: "100%",
        px: 2,
        pb: 1,
        pt: 1,
        bgcolor: "primary.main",
        color: "#fff",
        borderTop: 1
      }}>
        <Box sx={{ display: "flex" }}>
          <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
            {t("changeAmount")}
          </Typography>
          <Typography component="span" variant="body1">
            {changeAmount} $
          </Typography>
        </Box>
      </Box>
    </Box>
  );  
}