import { Helmet } from "react-helmet-async";
import { useLoginForm } from "./hooks/useLoginForm";
import { LoginView } from "./views/LoginView";

const LoginForm = () => {
  const login = useLoginForm();

  return (
    <>
      <Helmet>
        <title>Login | GymLink</title>
        <meta
          name="description"
          content="Login to your GymLink account and access your fitness dashboard."
        />
        <meta name="keywords" content="GymLink, login, fitness, gym, workout" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Login - GymLink" />
        <meta
          property="og:description"
          content="Sign in to GymLink and track your fitness journey with ease."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <LoginView
        email={login.email}
        password={login.password}
        loading={login.loading}
        onEmailChange={login.handleEmailChange}
        onPasswordChange={login.handlePasswordChange}
        onSubmit={login.handleSubmit}
      />
    </>
  );
};

export default LoginForm;
