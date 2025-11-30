export interface FormProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone_number: string;
    location: string;
    age: string;
    gender: string;
    avatar: File | null;
}

export interface RegisterViewProps {
    currentStep: number;
    formDetails: FormProps;
    disabled: boolean;
    loading: boolean;
    states: Array<{ code: string; name: string }>;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNextStep: () => void;
    onPrevStep: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onGoogleSignIn: () => void;
}

export interface LoginViewProps {
    email: string;
    password: string;
    loading: boolean;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export interface ForgotPasswordViewProps {
    email: string;
    loading: boolean;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export interface ResetPasswordViewProps {
    password: string;
    confirmPassword: string;
    loading: boolean;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}