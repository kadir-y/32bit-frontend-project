import {
  Button,
  CircularProgress 
} from "@mui/material";

import {
  Login as LoginIcon
} from "@mui/icons-material";

export default function LButton ({ onClick, isLoading, loadingLabel, label }) {
  return (<Button variant="contained"
    size="large"
    disabled={isLoading}
    onClick={onClick}
    startIcon={isLoading ? 
      <CircularProgress color="inherit" size="24px"/> :
      <LoginIcon />
    }
  >
    {isLoading ?
      loadingLabel :
      label 
    }
  </Button>)
}