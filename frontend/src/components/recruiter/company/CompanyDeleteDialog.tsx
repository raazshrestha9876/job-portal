import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSelectedCompany } from "@/hooks/useSelectedCompany";
import { useDeleteCompanyMutation } from "@/redux/services/companyApi";
import { companyDeleteDialogOpen } from "@/redux/slice/company";
import { type AppDispatch, type RootState } from "@/redux/store/store";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function CompanyDeleteDialog() {
    
  const dispatch = useDispatch<AppDispatch>();
  const { isCompanyDeleteDialogOpen } = useSelector(
    (state: RootState) => state.companies
  );
  const selectedCompany = useSelectedCompany();
  const [deleteCompany, { isLoading }] = useDeleteCompanyMutation();

  const handleDelete = async () => {
    try {
      await deleteCompany(selectedCompany._id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDialogClose = () => {
    dispatch(
      companyDeleteDialogOpen({
        index: -1,
        open: false,
      })
    );
  };

  return (
    <AlertDialog
      open={isCompanyDeleteDialogOpen}
      onOpenChange={handleDeleteDialogClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            company and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleDeleteDialogClose}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
