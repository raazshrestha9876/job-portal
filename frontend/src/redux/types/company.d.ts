export interface ICompany {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  description: string;
  logo?: string;
  active?: boolean;
  createdAt: Date;
}

export interface ICompanyState {
  companies: ICompany[];
  isCompanyDeleteDialogOpen: boolean;
  isCompanyEditSheetOpen: boolean;
  selectedIndex: number;
}
