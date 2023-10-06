import { Box, Typography } from "@mui/material";
import React, { Children } from "react";

export const WrapperContainer = ({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) => {
  return (
    <Box
      sx={{
        marginTop: "5rem",
        marginX: "auto",
        color: "text.primary",
      }}
    >
      <Box mb={1}>
        <Typography sx={{ fontSize: "18px" }}>{title}</Typography>{" "}
      </Box>
      {children}
    </Box>
  );
};
