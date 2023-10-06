import { SnackbarProvider } from "notistack";
import React from "react";

export const CustomisedSnackbar = ({ children }: { children: JSX.Element }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
};
