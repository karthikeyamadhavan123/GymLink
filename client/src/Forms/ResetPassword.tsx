import { useResetPasswordForm } from "@/Forms/hooks/useResetPasswordForm";
import { ResetPasswordView } from "./views/ResetPasswordView";
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
  const resetPassword = useResetPasswordForm();

  return (
    <>
      <Helmet>
        <title>Reset Password | GymLink</title>
        <meta
          name="description"
          content="Enter a new password for your GymLink account and get back to your workouts."
        />
        <meta
          name="keywords"
          content="GymLink, reset password, fitness account, security"
        />
        <meta property="og:title" content="Reset Password - GymLink" />
        <meta
          property="og:description"
          content="Set a new password and regain access to your GymLink account."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <ResetPasswordView
        password={resetPassword.password}
        confirmPassword={resetPassword.confirmPassword}
        loading={resetPassword.loading}
        onPasswordChange={resetPassword.handlePasswordChange}
        onConfirmPasswordChange={resetPassword.handleConfirmPasswordChange}
        onSubmit={resetPassword.handleSubmit}
      />
    </>
  );
};

export default ResetPassword;
