import type { ICompany } from "./company";

export interface IJobs {
    _id: string;
    title: string;
    description: string;
    requirements: string[];
    salary: number;
    location: string;
    experience: string;
    company: ICompany;
    position: string;
    jobType: string;
    createdAt: Date;

}


