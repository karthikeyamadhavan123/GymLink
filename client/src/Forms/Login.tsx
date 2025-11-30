import TitleHelmet from "./components/TitleHelmet";
import { useLoginForm } from "./hooks/useLoginForm";
import { LoginView } from "./views/LoginView";

// Main component that uses the view
const LoginForm = () => {
    const logic = useLoginForm();

    return (
        <>
            <TitleHelmet
                title="Login | GymLink"
                description_content="Login to your GymLink account and access your fitness dashboard."
                keywords_content="GymLink, login, fitness, gym, workout"
                og_title="Login - GymLink"
                og_description="Sign in to GymLink and track your fitness journey with ease."
                og_type="website"
            />
            <LoginView
                email={logic.email}
                password={logic.password}
                loading={logic.loading}
                onEmailChange={logic.handleEmailChange}
                onPasswordChange={logic.handlePasswordChange}
                onSubmit={logic.handleSubmit}
            />
        </>
    );
};

export default LoginForm;