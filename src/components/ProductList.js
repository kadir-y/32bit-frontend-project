import {
  List,
  ListSubheader,
  Typography
} from "@mui/material";
import ProductItem from "../components/ProductItem";
import { useBasket } from "../hooks/useBasket";
import { useTranslation } from "react-i18next";

export default function ProductList ({ value: selectedProduct, onChange: setSelectedProduct }) {
  const { t } = useTranslation("sales");
  const basket = useBasket();

  function handleClick(e, product) {
    setSelectedProduct(product);
  };

  return (
    <List
      subheader={
        <ListSubheader>{t("products")}</ListSubheader>
      }
    >
      {
        basket.length === 0 ?
        <Typography 
          component="div"
          variant="body2"
          sx={{ textAlign: "center", py: 5 }}
        >{t("emptyBasketMessage")}</Typography>
        : basket.map(product => 
          <ProductItem
            key={product.id}
            selectedProduct={selectedProduct}
            product={product}
            onClick={handleClick}
          />
        )
      }
    </List>
  );
}