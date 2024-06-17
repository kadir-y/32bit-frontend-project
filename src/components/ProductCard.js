import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import addTaxesToPrice from "../libs/addTaxesToPrice";
import priceNormalizer from "../libs/priceNormalizer";

const TypographyStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden"
}

export default function ProductCard({ product, onClick: handleClick, sx }) {
  const { title, thumbnail, barcode, category, price, taxes } = product;
  const priceWithTaxes = priceNormalizer(addTaxesToPrice(price, taxes));
  sx = Boolean(sx) ? sx : {};
  return(
    <Card key={title} sx={{
      width: "10rem",
      cursor: "pointer",
      "&:hover": { transform: "translateY(-0.75rem)" },
      transition: "transform 0.3s",
      mb: 2,
      ...sx
    }}
    onClick={handleClick}
    >
      <CardMedia>
        <CardMedia
          component="img"
          alt={title}
          height="120"
          src={thumbnail}
        ></CardMedia>
        <CardContent>
          <Typography 
            component="div"
            variant="body2"
            sx={{ ...TypographyStyle, fontSize: "0.8rem" }}
          >{barcode}</Typography>
          <Typography
            component="div"
            variant="body2"
            sx={{ ...TypographyStyle }}
          >{title}</Typography>
          <Typography 
            component="div" 
            variant="subtitle2" 
            sx={{ ...TypographyStyle, textTransform: "capitalize", fontSize: "0.8rem" }}
          >{category}</Typography>
          <Typography 
            variant="body2"
            color="text.secondary"
            sx={{ ...TypographyStyle }}
          >{priceWithTaxes}$</Typography>
        </CardContent>
      </CardMedia>
    </Card>
  );
} 