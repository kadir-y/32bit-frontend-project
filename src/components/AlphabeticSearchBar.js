import { 
  Button,
  ButtonGroup
} from "@mui/material";
import { 
  Splitscreen as SplitscreenIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";

const buttons = [
  "A",
  "B",
  "C-D",
  "E-F",
  "G-I",
  "J-K",
  "L-N",
  "P",
  "R-S",
  "T",
  "U-Z"
];

export default function AlphabeticSearchBar(props) {
  const { t } = useTranslation("app");
  function handleChange(e) {
    props.onChange(e)
  }
  return (
    <ButtonGroup 
        sx={{
          textWrap: "nowrap"
        }}
        variant="text"
        aria-label="alphabetic-sorter"
      >
      <Button
        onClick={handleChange}
        value=""
        variant={ Boolean(props.value) ? "text" : "contained" } 
        startIcon={<SplitscreenIcon />}
      >{t("alphabeticSearchbar.all")}</Button>
      {
        buttons.map(b => 
          <Button 
            key={b}
            variant={ b === props.value ? "contained" : "text" }
            value={b} onClick={handleChange}
          >{b}</Button>
        )
      }
    </ButtonGroup>
  );
}
