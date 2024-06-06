import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

const TypographyStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden"
}

export default function CategoryCard({ category, thumbnail, onClick: handleClick }) {
  return(
    <Card sx={{
        width: "8rem",
        cursor: "pointer",
        "&:hover": { transform: "translateY(-1rem)" },
        transition: "transform 0.3s",
        mb: 2,
      }}
      onClick={handleClick}
    >
      <CardMedia>
        <CardMedia
          component="img"
          alt={category}
          height="100"
          src={thumbnail}
        ></CardMedia>
        <CardContent>
          <Typography 
            component="div"
            variant="body2"
            sx={{ ...TypographyStyle, textTransform: "capitalize" }}
          >{category}</Typography>
        </CardContent>
      </CardMedia>
    </Card>
  );
} 