//all the applications will be visible to admin types here
export interface AdminApplicationProps {
    _id: string;
    appliedUser: {
        firstName: string,
        email: string
        gender: string
        phone_number: string
    }
    gym: {
        gymName: string
        location: {
            state: string
        }
    }
    invoiceDays: number
    jobId: string
    previousExperience: string
    previousWork: string
    status: string
    resume: string
}