//all gym types will go here of users gym 
export interface GymProps {
    _id: string;
    gymName: string;
    equipments: string[];
    location: {
        area: string;
        city: string;
        landmark: string;
        pincode: string;
        state: string;
        streetName: string;
    };
    gymImages: string[];
}

export interface SingleGymProps {
  basePrice: number;
  equipments: string[];
  gymImages: string[];
  gymName: string;
  location: {
    area: string;
    city: string;
    landmark: string;
    pincode: string;
    state: string;
    streetName: string;
  };
  owner: {
    firstName: string;
    email: string;
    gender: string;
    phone_number: string;
  };
}

export default interface GymCardProps {
  gym: GymProps;
  onClick: () => void;
}
