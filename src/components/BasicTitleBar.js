import {
  Paper,
  Typography,
  Button
} from "@mui/material";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BasicTitleBar(props) {
  const { t } = useTranslation("app");
  const { title, endSlot, backwardLink } = props;
  const navigate = useNavigate();

  function handleBackwardClick() {
    navigate(backwardLink ? backwardLink : -1);
  };

  return (
    <Paper sx={{ 
      width: "100%",
      p: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Button 
        sx={{
          textTransform: "none",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
        variant="text"
        onClick={handleBackwardClick}
      >
        <ArrowBackIosNewIcon sx={{ mr: 1 }}/>
        {t("backward")}
      </Button>
      <Typography 
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          px: 2
        }}
        component="span" 
        variant="h6">{ title }</Typography>
      { endSlot ? endSlot : ""}
    </Paper>
  )
}
