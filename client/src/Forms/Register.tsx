import useRegisterForm from "./hooks/useRegisterForm";
import { Helmet } from "react-helmet-async";
import { RegisterView } from "./views/RegisterView";

export default function Register() {
  const register = useRegisterForm();

  return (
    <>
      <Helmet>
        <title>Register | GymLink</title>
        <meta
          name="description"
          content="Create your GymLink account and start your fitness journey today!"
        />
        <meta
          name="keywords"
          content="GymLink, fitness, register, sign up, gym membership"
        />

        <meta property="og:title" content="Register - GymLink" />
        <meta
          property="og:description"
          content="Join GymLink today and connect with the best gyms and trainers in your area."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <RegisterView
        currentStep={register.currentStep}
        formDetails={register.formDetails}
        disabled={register.disabled}
        loading={register.loading}
        states={register.states}
        onInputChange={register.handleChange}
        onFileChange={register.handleFileChange}
        onNextStep={register.nextStep}
        onPrevStep={register.prevStep}
        onSubmit={register.handleSubmit}
        onGoogleSignIn={register.handleGoogleSignIn}
      />
    </>
  );
}
