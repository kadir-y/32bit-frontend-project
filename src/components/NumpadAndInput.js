import { useRef, useEffect, useState } from "react";
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
  const [value, setValue] = useState("");
  const refValue = useRef("");
  const onChange = props.onChange ? props.onChange : () => { };
  const { unit } = props;

  useEffect(() => {
    setValue(() => {
      const symbol = unitSymbols[unit];
      if (unit === "price") return `.00 ${symbol}`;
      else if (unit === "mass") return `.000 ${symbol}`;
      if (unit === "piece") return `0 ${symbol}`;
    });
  }, [unit])

  function handleChange(keyValue) {
    let val = refValue.current;
    if (!Boolean(val) &&
       (keyValue === "decrease" || keyValue === "backspace")
    ) return;
    if (keyValue === "backspace") {
      if (unit === "mass" || unit === "price") {
        val = val.slice(0, -1);
      } else if (unit === "piece") {
        val = val.length === 1 ? "0" : val.slice(0, -1);
      }
      value.slice(0, -1);
    } else if (keyValue === "increase") {
      Boolean(val) || (val = "0");
      if (unit === "piece") {
        val = (parseInt(val) + 1).toString();
      } else if (unit === "mass") {
        val = (parseInt(val) + 1000).toString();
      } else if (unit === "price") {
        val = (parseInt(val) + 100).toString();
      }
    } else if (keyValue === "decrease") {
      if (unit === "piece") {
        val = (parseInt(val) - 1).toString();
      } else if (unit === "mass") {
        val = (parseInt(val) - 1000).toString();
      } else if (unit === "price") {
        val = (parseInt(val) - 100).toString();
      }
    } else if (!(keyValue[0] === "0" && val === "")) {
      val += keyValue;
    }
    val = val < 0 ? "0" : val;
    refValue.current = val;
    if (unit === "mass") {
      switch (val.length) {
        case 0:
          val = ".000";
          break;
        case 1:
          val = ".00" + val;
          break;
        case 2:
          val = ".0" + val;
          break;
        default:
          val = val.slice(0, -3) + "." + val.slice(-3);
      }
    }
    if (unit === "price") {
      switch (val.length) {
        case 0:
          val = ".00"
          break;
        case 1:
          val = ".0" + val
          break;
        default:
          val = val.slice(0, -2) + "." + val.slice(-2);
      }
    }
    val = `${val} ${unitSymbols[unit]}`;
    onChange(val);
    setValue(val);
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
        px: 1.5
      }}>{value}</Box>
      <Grid container>
        <Grid item xs={7} sx={{ pr: 1 }}>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange("7")}>7</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("8")}>8</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("9")}>9</NumpadButton>
          </Box>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange("4")}>4</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("5")}>5</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("6")}>6</NumpadButton>
          </Box>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <NumpadButton variant="contained" onClick={() => handleChange("1")}>1</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("2")}>2</NumpadButton>
            <NumpadButton variant="contained" onClick={() => handleChange("3")}>3</NumpadButton>
          </Box>
          <Box sx={{ display: "flex" }}>
            <NumpadButton variant="contained" onClick={() => handleChange("0")}>0</NumpadButton>
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
          <Button fullWidth variant="contained" sx={{ mb: 1 }} onClick={() => handleChange("00")}>00</Button>
          <Button fullWidth variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleChange("backspace")}>
            <BackspaceOutlinedIcon />
          </Button>
          <Button fullWidth variant="contained" color="primary" sx={{ flexGrow: 1 }}>Devam Et</Button>
        </Grid>
      </Grid>
    </>
  );
}