import { Box, Paper, Stack, Button } from "@mui/material";
import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        square={true}
        sx={{
          backgroundImage: "unset",
          padding: 4,
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "max-content" }}
          direction="row"
        >
          <Logo />
          <Button
            type="link"
            color="secondary"
            href="https://github.com/AnmolSaini16"
            target="_blank"
          >
            Made By Anmol
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
