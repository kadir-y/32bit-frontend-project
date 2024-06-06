import {
  List,
  ListSubheader,
  Typography
} from "@mui/material";
import ProductItem from "../components/ProductItem";
import { useBasket } from "../hooks/useBasket";

export default function ProductList ({ value: selectedProduct, onChange: setSelectedProduct }) {
  const basket = useBasket();

  function handleClick(e, product) {
    setSelectedProduct(product);
  };

  return (
    <List
      subheader={
        <ListSubheader>Products</ListSubheader>
      }
    >
      {
        basket.length === 0 ?
        <Typography 
          component="div"
          variant="body2"
          sx={{ textAlign: "center", py: 5 }}
        >Lütfen Sepete Ürün Ekleyin</Typography>
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