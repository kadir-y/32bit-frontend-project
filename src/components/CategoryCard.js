import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

export default function CategoryCard({ title, image }) {
  return(
    <Card key={title} sx={{
      width: "7rem",
      cursor: "pointer",
      "&:hover": { transform: "translateY(-1rem)" },
      transition: "transform 0.3s",
      mb: 2
    }}>
      <CardMedia>
        <CardMedia
          component="img"
          alt={title}
          height="100"
          src={image}
        ></CardMedia>
        <CardContent>
          <Typography component="span" variant="body2">{title}</Typography>
        </CardContent>
      </CardMedia>
    </Card>
  );
} 