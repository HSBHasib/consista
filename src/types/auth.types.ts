export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface OtpVerificationFormData {
  otp: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirm: string;
}

export interface ResetPasswordFormProps {
  token?: string;
  onSubmitReset?: (data: ResetPasswordFormData) => Promise<void> | void;
  loading?: boolean;
}

export interface ExtendedOtpVerificationFormProps extends OtpVerificationFormProps {
  verificationType?: "email-verification" | "forget-password";
  onSuccessRoute?: string;
}

export interface PasswordInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  register: RegisterFormData;
  registerOptions?: any;
}


export interface OtpVerificationFormProps {
  email?: string;
  onSubmitOtp?: (data: OtpVerificationFormData) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  loading?: boolean;
}