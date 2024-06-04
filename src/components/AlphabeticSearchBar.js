import { 
  Button,
  ButtonGroup,
  Paper 
} from "@mui/material";
import { 
  Splitscreen as SplitscreenIcon
} from '@mui/icons-material';

export default function AlphabeticSearchBar(props) {
  const sx = props.sx ? props.sx : {}
  const elevation = props.elevation ? props.elevation : 1;
  function handleChange(e) {
    props.onChange(e)
  }
  return (
    <Paper sx={{
        ...sx,
        overflow: "auto",
        textAlign: "center"
      }}
      elevation={elevation}
    >
      <ButtonGroup sx={{
      }} variant="text" aria-label="alphabetic-sorter">
        <Button variant="text" onClick={handleChange} value="" startIcon={<SplitscreenIcon />}>All</Button>
        {
          buttons.map(b => 
            <Button key={b} variant="text" value={b} onClick={handleChange}>{b}</Button>
          )
        }
      </ButtonGroup>
    </Paper>
  );
}

const buttons = [
  "A",
  "B",
  "C-D",
  "E-F",
  "G-I",
  "K",
  "L-N",
  "P",
  "R-S",
  "S-T",
  "U-Z"
]