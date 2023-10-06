export interface SignInForm {
  email: string;
  password: string;
}
export interface SignUpForm extends SignInForm {
  name: string;
}
