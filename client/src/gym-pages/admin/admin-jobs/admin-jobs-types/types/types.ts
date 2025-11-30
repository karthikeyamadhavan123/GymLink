export interface AdminJobPostingProps {
  _id: string;
  jobTitle: string;
  requirements: string;
  jobDetails: string;
  experienceRequired: number;
  salary: number;
}

export interface AdminJobProps {
  jobs: AdminJobPostingProps[];
}