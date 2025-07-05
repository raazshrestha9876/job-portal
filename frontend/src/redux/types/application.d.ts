import type { IUser } from "./auth";
import type { IJobs } from "./job";

export interface IApplication {
  _id: string;
  job: IJobs;
  applicant: IUser;
  status: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApplicationState {
  applications: IApplication[];
  selectedIndex: number;
  isApplyJobDialogOpen: boolean;
}