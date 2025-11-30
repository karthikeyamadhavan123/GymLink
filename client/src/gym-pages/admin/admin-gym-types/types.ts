export interface AdminGymProps {
    _id: string;
    gymName: string;
    equipments: string[];
    basePrice: number;
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

export interface EditGymProps {
    gym: AdminGymProps;
    onSave :(updatedGym:AdminGymProps)=>void
    onClose: () => void;
}

export interface AdminGymEditFormData {
    editedgymName: string;
    editedbasePrice: number;
    editedequipments: string;
    editedarea: string;
    editedcity: string;
    editedlandmark: string;
    editedpincode: string;
    editedstate: string;
    editedstreetName: string;
}