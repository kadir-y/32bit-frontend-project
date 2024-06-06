import {
  ListItemText,
  ListItemButton,
  Typography,
  Box
} from "@mui/material";

const TypographyStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden"
}

export default function ProductItem({ product, selectedProduct, onClick: handleClick }) {
  return (
    <ListItemButton
      selected={selectedProduct.id === product.id}
      onClick={e => handleClick(e, product)}
    >
      <ListItemText>
        <Box sx={{ display: "flex", flexWrap: 1, justifyContent: "space-between" }}>
          <Typography 
            component="span"
            variant="body2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)" }}
          >{ product.title }</Typography>
          <Typography 
            component="span"
            variant="subtitle2"
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)", fontSize: "0.7rem" }}
          >
            {
              (
                (product.kdv ? `%${product.kdv} KDV` : "") +
                (product.otv ? ` %${product.otv} ÖTV` : "") +
                (product.mtv ? ` %${product.mtv} MTV` : "")
              ).trim()
            }
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
            sx={{ ...TypographyStyle, maxWidth: "calc(50% - 1rem)", fontSize: "0.8rem"  }}
          >{product.measure} {product.unit === "mass" ? "kg" : "piece" } x {product.price} $</Typography>
        </Box>
        <Typography 
          component="div"
          variant="subtitle2"
          sx={{ ...TypographyStyle, textAlign: "right"}}
        >{parseFloat(product.price * product.measure).toFixed(2)} $</Typography>
      </ListItemText>
    </ListItemButton>
  );
}