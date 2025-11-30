import { Helmet } from "react-helmet-async";
import { useForgotPasswordForm } from "./hooks/useForgotPasswordForm";
import { ForgotPasswordView } from "./views/ForgotPasswordView";

const ForgotPassword = () => {
  const forgotPassword = useForgotPasswordForm();

  return (
    <>
      <Helmet>
        <title>Forgot Password | GymLink</title>

        <meta
          name="description"
          content="Reset your GymLink password and regain access to your fitness account."
        />
        <meta
          name="keywords"
          content="GymLink, forgot password, reset password, account recovery"
        />
        <meta property="og:title" content="Forgot Password - GymLink" />
        <meta
          property="og:description"
          content="Need help logging in? Reset your password here."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <ForgotPasswordView
        email={forgotPassword.email}
        loading={forgotPassword.loading}
        onEmailChange={forgotPassword.handleEmailChange}
        onSubmit={forgotPassword.handleSubmit}
      />
    </>
  );
};

export default ForgotPassword;
