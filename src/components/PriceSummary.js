import {
  Box,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
import normalizePrice from "../libs/priceNormalizer"

export default function PriceSummary (props) {
    const { t } = useTranslation("sales");
    const totalPrice = normalizePrice(props.totalPrice);
    const subtotalPrice = normalizePrice(props.subtotalPrice);
    return (
      <>
        <Box sx={{
          px: 2,
          py: 1,
          bgcolor: "info.main",
          color: "white"
        }}>
          <Box sx={{ display: "flex" }}>
            <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
              {t("subtotal")} 
            </Typography>
            <Typography component="span" variant="body1">
              {subtotalPrice} $
            </Typography>
          </Box>
        </Box>
        <Box sx={{
          width: "100%",
          px: 2,
          pb: 1,
          pt: 1,
          bgcolor: "primary.main",
          color: "#fff"
        }}>
          <Box sx={{ display: "flex" }}>
            <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
              {t("totalPrice")}
            </Typography>
            <Typography component="span" variant="body1">
              {totalPrice} $
            </Typography>
          </Box>
        </Box>
      </>
    );
  }