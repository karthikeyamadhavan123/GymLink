//admin-trainer-types here
export interface Trainer {
    _id: string;
    trainerName: string;
    expertise: string[];
    certifications: string[];
    experience: string;
    contactNumber: string;
    trainerImage: string;
    description: string;
}

export interface EditTrainerFormProps {
    trainer: Trainer;
    gymId: string;
    onClose: () => void;
    onSuccess: (updatedTrainer: Trainer) => void;
}

export interface TrainerFormData {
    trainerName: string;
    expertise: string;
    experience: string;
    contactNumber: string;
    description: string;
}