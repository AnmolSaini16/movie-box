import { AppContext, AppContextType } from "@/context/appContext";
import { Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";

export const Logo = ({ linkHome = true }: { linkHome?: boolean }) => {
  const theme = useTheme();
  const { searchText, setSearchText } = useContext(
    AppContext
  ) as AppContextType;

  const handleClick = () => {
    if (searchText.length) setSearchText("");
  };

  const logo = (
    <Typography fontWeight="700" fontSize="1.4rem" color="secondary">
      Movie<span style={{ color: theme.palette.primary.main }}>Box</span>
    </Typography>
  );

  return linkHome ? (
    <Link href="/" onClick={handleClick} style={{ textDecoration: "none" }}>
      {logo}
    </Link>
  ) : (
    logo
  );
};
