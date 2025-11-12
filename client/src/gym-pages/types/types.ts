// all gyms types will be listed here

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