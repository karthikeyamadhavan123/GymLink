//trainer types

export interface TrainerProps {
  certifications: string
  contactNumber: string
  description: string
  experience: number
  expertise: string[]
  trainerImage: string
  trainerName: string
  _id: string
  gymId: {
    location: {
      area: string;
      city: string;
      landmark: string;
      pincode: string;
      state: string;
      streetName: string;
    };
    gymName: string;
  }
}

export interface UserTrainerProps {
  certifications: string
  contactNumber: string
  description: string
  experience: number
  expertise: string[]
  trainerImage: string
  trainerName: string
  _id: string
}