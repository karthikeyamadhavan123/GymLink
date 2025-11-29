export interface JobProps {
    _id: string;
    experienceRequired: number;
    jobDetails: string;
    jobTitle: string;
    postedBy: {
        gymName: string;
        _id: string
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
        }
    };
    requirements: string;
    salary: number;
}