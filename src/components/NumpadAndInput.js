import { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Button
} from "@mui/material";
import {
  BackspaceOutlined as BackspaceOutlinedIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { styled } from "@mui/material/styles";
import getMeasureDigit from "../libs/getMeasureDigit";

const unitSymbols = {
  price: "$",
  mass: "kg",
  piece: "pieces"
} 

const NumpadButton = styled(Button)({
  padding: 0,
  minWidth: 0,
  flexGrow: 1,
  height: "3rem",
  fontSize: "1.25rem",
  marginRight: "0.25rem",
  "&:last-child": {
    marginRight: 0
  }
})

const normalizeButton = {
  minWidth: "0 !important",
  minHeight: "0 !important",
  padding: "0",
  margin: "0"
}

export default function NumpadAndInput(props) {
  const onChange = props.onChange ? props.onChange : () => { };
  const AdditionalButton = props.AdditionalButton;
  const { unit, measure } = props;
  const [value, setValue] = useState();
  const digit = useRef(0);
  
  useEffect(() => {
    digit.current = getMeasureDigit(unit);
    setValue(parseFloat(0).toFixed(digit.current));
  }, [unit]);

  useEffect(() => {
    setValue(measure);
  }, [measure]);
  
  function handleChange(keyValue) {
    if (!Boolean(unit) || !Boolean(measure)) return;
    let val = parseInt(parseFloat(value) * Math.pow(10, digit.current));
    if (keyValue === "decrease" && val === 0) return;
    if (keyValue === "backspace") {
      val = Math.floor(val / 10);
    } else if (keyValue === "increase") {
      val += Math.pow(10, digit.current);
    } else if (keyValue === "decrease") {
      val -= Math.pow(10, digit.current);
    } else if (keyValue === "doublezero") {
      val = val * 100;
    } else {
      val = val * 10 + keyValue ;
    }
    val = (val / Math.pow(10, digit.current)).toFixed(digit.current);
    setValue(val);
    onChange(val);
  };

  return (
    <>
      <Box sx={{
        border: 1,
        borderColor: "grey.500",
        borderRadius: 2,
        height: "3rem",
        lineHeight: "3rem",
        fontSize: "1.25rem",
        my: 1,
        px: 1.5,
        textAlign: "right"
      }}>{(Boolean(unit) && Boolean(measure)) && `${value} ${unitSymbols[unit]}`}</Box>
      <Grid container>
        <Grid item xs={7} sx={{ pr: 1 }}>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange(7)}>7</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange(8)}>8</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange(9)}>9</NumpadButton>
          </Box>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange(4)}>4</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange(5)}>5</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange(6)}>6</NumpadButton>
          </Box>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange(1)}>1</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange(2)}>2</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange(3)}>3</NumpadButton>
          </Box>
          <Box sx={{ display: "flex" }}>
            <NumpadButton variant="contained" onClick={() => handleChange(0)}>0</NumpadButton>
          </Box>
        </Grid>
        <Grid item xs={5} sx={{ pl: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleChange("increase")}
              sx={{ ...normalizeButton, mr: 0.5 }}
            >
              <AddIcon />
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleChange("decrease")}
              sx={{ ...normalizeButton, ml: 0.5, height: "2.5rem"}}
            >
              <RemoveIcon />
            </Button>
          </Box>
          <Button fullWidth variant="contained" sx={{ mb: 1 }} onClick={() => handleChange("doublezero")}>00</Button>
          <Button fullWidth variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleChange("backspace")}>
            <BackspaceOutlinedIcon />
          </Button>
          { AdditionalButton }
        </Grid>
      </Grid>
    </>
  );
}