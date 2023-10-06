import { styled, alpha, InputBase } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "0",
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: "20ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "&:focus": {
        width: "10ch",
      },
    },
  },
}));
