import { appConstants } from "@/constants/appConstants";
import { SignUpForm } from "@/interfaces/authInterface";
import { validateFields } from "@/utils";
import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

interface Props {
  handleClose: () => void;
  setAuthAction: React.Dispatch<React.SetStateAction<string>>;
}
export const SignUp: React.FC<Props> = ({ handleClose, setAuthAction }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [startValidationOnType, setStartValidationOnType] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorsList, setErrorsList] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<SignUpForm>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  useEffect(() => {
    startValidationOnType &&
      validateFields<SignUpForm>(formValues, setErrorsList);
  }, [formValues]);

  const handleSignUp = async () => {
    if (!validateFields<SignUpForm>(formValues, setErrorsList)) {
      setStartValidationOnType(true);
      return;
    }
    try {
      setLoading(true);
      const response = await signIn("sign-up", {
        ...formValues,
        redirect: false,
      });
      if (!response?.ok) {
        setErrorMessage(response?.error as string);
      } else {
        enqueueSnackbar("Signed In", { variant: "success" });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField
          label="Name"
          type="text"
          variant="outlined"
          onChange={(e) => handleChange("name", e.target.value)}
          error={errorsList.includes(appConstants.Error_Msg.Short_Name)}
          helperText={
            errorsList.includes(appConstants.Error_Msg.Short_Name) &&
            appConstants.Error_Msg.Short_Name
          }
        />

        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          onChange={(e) => handleChange("email", e.target.value)}
          error={errorsList.includes(appConstants.Error_Msg.Invalid_Email)}
          helperText={
            errorsList.includes(appConstants.Error_Msg.Invalid_Email) &&
            appConstants.Error_Msg.Invalid_Email
          }
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => handleChange("password", e.target.value)}
          error={errorsList.includes(appConstants.Error_Msg.Short_Password)}
          helperText={
            errorsList.includes(appConstants.Error_Msg.Short_Password) &&
            appConstants.Error_Msg.Short_Password
          }
        />

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="contained"
            sx={{ width: 120 }}
            disabled={
              !formValues.email ||
              !formValues.password ||
              !formValues.name ||
              loading ||
              errorsList.length > 0
            }
            onClick={handleSignUp}
          >
            {loading ? (
              <CircularProgress color="secondary" size={14} />
            ) : (
              "Register"
            )}
          </Button>

          <Button variant="outlined" sx={{ width: 120 }} onClick={handleClose}>
            Cancel
          </Button>
        </Stack>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography color="secondary" sx={{ fontSize: 14 }}>
            Already have an account?
          </Typography>
          <Button
            variant="text"
            sx={{ fontSize: 14 }}
            onClick={() => setAuthAction(appConstants.Auth_State.SignIn)}
          >
            Sign In
          </Button>
        </Box>
      </Stack>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </>
  );
};
