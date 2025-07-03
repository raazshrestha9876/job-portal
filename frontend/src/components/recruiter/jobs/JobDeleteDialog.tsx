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
import { useSelectedJob } from "@/hooks/useSelectedJob";

import { useDeleteJobMutation } from "@/redux/services/jobApi";
import { jobDeleteDialogOpen } from "@/redux/slice/job";
import { type AppDispatch, type RootState } from "@/redux/store/store";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function JobDeleteDialog() {

  const dispatch = useDispatch<AppDispatch>();
  const { isJobDeleteDialogOpen } = useSelector(
    (state: RootState) => state.jobs
  );
  const selectedJob = useSelectedJob();
 
  const [deleteJob, { isLoading }] = useDeleteJobMutation();

  const handleDelete = async () => {
    try {
      await deleteJob(selectedJob._id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDialogClose = () => {
    dispatch(
      jobDeleteDialogOpen({
        index: -1,
        open: false,
      })
    );
  };
  return (
    <AlertDialog
      open={isJobDeleteDialogOpen}
      onOpenChange={handleDeleteDialogClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Job
            and remove your data from our servers.
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
