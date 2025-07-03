import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { CompanyDeleteDialog } from "@/components/recruiter/company/CompanyDeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store/store";
import { companyDeleteDialogOpen, companyEditSheetOpen } from "@/redux/slice/company";
import CompanyEditSheet from "@/components/recruiter/company/CompanyEditSheet";
import CompanyViewItem from "@/components/recruiter/company/CompanyViewItem";

const ViewCompanyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCompanyDeleteDialogOpen, isCompanyEditSheetOpen } = useSelector(
    (state: RootState) => state.companies
  );

  const handleDeleteDialogOpen = (index: number, open: boolean) => {
    dispatch(
      companyDeleteDialogOpen({
        index,
        open,
      })
    );
  };

  const handleEditSheetOpen = (index: number, open: boolean) => {
    dispatch(
      companyEditSheetOpen({
        index,
        open,
      })
    );
  };

  return (
    <div className="px-10 py-7 mx-auto  w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/recruiter/company"
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    Company
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-slate-400" />
              </BreadcrumbList>
            </Breadcrumb>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Companies
              </h1>
              <p className="text-slate-600 text-lg">
                Manage and view all companies in your directory.
              </p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Link to={"/recruiter/company/add"}>
              <Plus className="mr-2 h-5 w-5" />
              Add Company
            </Link>
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <CompanyViewItem
        onDeleteDialogOpen={handleDeleteDialogOpen}
        onEditSheetOpen={handleEditSheetOpen}
      />
      {isCompanyDeleteDialogOpen && <CompanyDeleteDialog />}
      {isCompanyEditSheetOpen && <CompanyEditSheet />}
    </div>
  );
};

export default ViewCompanyPage;
