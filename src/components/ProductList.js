import {
  List,
  ListSubheader,
  Typography
} from "@mui/material";
import ProductItem from "../components/ProductItem";
import { useBasketItems } from "../hooks/useBasket";
import { useTranslation } from "react-i18next";

export default function ProductList ({ value: selectedProduct, onChange: setSelectedProduct }) {
  const { t } = useTranslation("sales");
  const basketItems = useBasketItems();
  
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
        basketItems.length === 0 ?
        <Typography 
          component="div"
          variant="body2"
          sx={{ textAlign: "center", py: 5 }}
        >{t("emptyBasketMessage")}</Typography>
        : basketItems.map(product =>
          <ProductItem
            key={product.id}
            selected={selectedProduct.id === product.id}
            product={product}
            onClick={handleClick}
          />
        )
      }
    </List>
  );
}