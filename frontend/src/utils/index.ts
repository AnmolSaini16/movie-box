import { appConstants } from "@/constants/appConstants";
import { SignInForm, SignUpForm } from "@/interfaces/authInterface";
import jwt, { JwtPayload } from "jsonwebtoken";

export const validateFields = <T extends SignUpForm | SignInForm>(
  formValues: T,
  setErrorsList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  let hasNoError = true;
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors = [];

  if ("name" in formValues && formValues?.name && formValues.name.length < 6) {
    errors.push(appConstants.Error_Msg.Short_Name);
    hasNoError = false;
  }

  if (formValues.password.length < 6) {
    errors.push(appConstants.Error_Msg.Short_Password);
    hasNoError = false;
  }

  if (!regEmail.test(formValues.email)) {
    errors.push(appConstants.Error_Msg.Invalid_Email);
    hasNoError = false;
  }

  setErrorsList(errors);
  return hasNoError;
};

export const getTokenExpiryTime = (token: string) => {
  const decodedToken = jwt.decode(token) as JwtPayload;
  return decodedToken?.exp as number;
};

export const isTokenExpired = (token: string) => {
  const decodedTokenExpTime = getTokenExpiryTime(token);
  if (decodedTokenExpTime) {
    if (Date.now() > decodedTokenExpTime * 1000) return true;
  }
  return false;
};
