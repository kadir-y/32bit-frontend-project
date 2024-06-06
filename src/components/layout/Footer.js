import {
  Typography,
  Paper,
  Box
} from "@mui/material"
import {
  FiberManualRecord as FiberManualRecordIcon
} from '@mui/icons-material';

export default function Footer() {
  return (
    <Paper sx={{ px: 2, py: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="body1">SATICI/MÜŞTERİ</Typography>
        <Typography component="span" variant="body2">SATIŞ BELGESİ</Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Ingenico
          <FiberManualRecordIcon color="error" />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="body1">Merkeze Gönderilecek: 0</Typography>
        <Typography component="span" variant="body2">1057/Haz. 5</Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Mağaza Çevrimiçi
          <FiberManualRecordIcon color="success" />
        </Typography>
      </Box>
    </Paper>
  );
}