import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import addTaxToUnitPrice from "../libs/addTaxToUnitPrice";

const TypographyStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden"
}

export default function ProductCard({ product, onClick: handleClick }) {
  const { title, thumbnail, barcode, category } = product;

  return(
    <Card key={title} sx={{
      width: "10rem",
      cursor: "pointer",
      "&:hover": { transform: "translateY(-1rem)" },
      transition: "transform 0.3s",
      mb: 2
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
          >{addTaxToUnitPrice(product)}$</Typography>
        </CardContent>
      </CardMedia>
    </Card>
  );
} 