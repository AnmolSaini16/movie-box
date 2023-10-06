import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Logo } from "../Logo";
import { appConstants } from "@/constants/appConstants";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

interface Props {
  handleClose: () => void;
  open: boolean;
}
export const AuthModal: React.FC<Props> = ({ open, handleClose }) => {
  const [authAction, setAuthAction] = useState<string>(
    appConstants.Auth_State.SignIn
  );
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Logo linkHome={false} />
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box p={2}>
          {authAction === appConstants.Auth_State.SignIn ? (
            <SignIn handleClose={handleClose} setAuthAction={setAuthAction} />
          ) : (
            <SignUp handleClose={handleClose} setAuthAction={setAuthAction} />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
