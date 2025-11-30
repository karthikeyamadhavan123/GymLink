import useRegisterForm from './hooks/useRegisterForm';
import TitleHelmet from './components/TitleHelmet';
import { RegisterView } from './views/RegisterView';

export default function Register() {
    const register = useRegisterForm();

    return (
        <>
            <TitleHelmet
                title="Register | GymLink"
                description_content="Create your GymLink account and start your fitness journey today!"
                keywords_content="GymLink, fitness, register, sign up, gym membership"
                og_title="Register - GymLink"
                og_description="Join GymLink today and connect with the best gyms and trainers in your area."
                og_type="website"
            />
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