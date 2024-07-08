import {
  ListItemText,
  ListItemButton,
  Typography,
  Box
} from "@mui/material";
import priceNormalizer from "../libs/priceNormalizer";
import makeDiscount from "../libs/makeDiscount";

const TypographyStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: "calc(50% - 1rem)"
};

export default function ProductItem({ product, selected, onClick: handleClick }) {
  const priceWithTaxes = priceNormalizer(product.priceWithTaxes);
  const totalPrice = priceNormalizer(product.totalPrice);
  const unitPrice = priceNormalizer(product.price);
  const discount = product.discount;
  const discountedPrice = product.discount ? priceNormalizer(makeDiscount(priceWithTaxes, discount)) : 0;
  const taxesText = product.taxes
    .map(tax => `${tax.name} ${tax.amount}%`)
    .join(" ");
  return (
    <ListItemButton
      selected={selected}
      onClick={e => handleClick(e, product)}
    >
      <ListItemText>
        <Box sx={{ display: "flex", flexWrap: 1, justifyContent: "space-between" }}>
          <Typography 
            component="span"
            variant="body2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)" }}
          >{product.title}</Typography>
          <Typography 
            component="span"
            variant="subtitle2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)", fontSize: "0.75rem" }}
          > 
            {`${unitPrice}$ and ${taxesText}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: 1, justifyContent: "space-between" }}>
          <Typography 
            component="span"
            variant="subtitle2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)", textTransform: "capitalize", fontSize: "0.8rem" }}
          >{product.category}</Typography>
          <Typography 
            component="span"
            variant="subtitle2"
            sx={{ ...TypographyStyle, fontSize: "0.8rem"  }}
          >{product.measure} {product.unit === "mass" ? "kg" : "pieces" } x&nbsp; 
          { 
            discount 
            ? <>
                <s>{priceWithTaxes}$</s>&nbsp;&nbsp; 
                <Typography component="span" variant="subtitle2" color="#50B498">{discount}</Typography>
                &nbsp;&nbsp;{discountedPrice}$
              </> 
            : <span>{priceWithTaxes}$</span>
          }
          </Typography>
        </Box>
        <Typography 
          component="div"
          variant="subtitle2"
          sx={{ ...TypographyStyle, maxWidth: "100%", textAlign: "right", fontSize: "0.85rem"}}
        >= {totalPrice}$</Typography>
      </ListItemText>
    </ListItemButton>
  );
}