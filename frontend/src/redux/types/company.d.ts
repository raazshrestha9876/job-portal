export interface ICompany {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  description: string;
  logo?: string;
  createdAt: Date;
}

export interface ICompanyState {
    companies: ICompany[];
    isCompanyDeleteDialogOpen: boolean;
    selectedIndex: number;
}