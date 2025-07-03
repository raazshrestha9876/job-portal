import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";
import { useGetRecruiterJobsQuery } from "@/redux/services/jobApi";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store/store";
import { useEffect } from "react";

import JobViewItem from "@/components/recruiter/jobs/JobViewItem";
import JobFilterComp from "@/components/recruiter/jobs/JobFilterComp";
import { JobDeleteDialog } from "@/components/recruiter/jobs/JobDeleteDialog";
import { jobDeleteDialogOpen, jobEditDialogOpen, setJobs } from "@/redux/slice/job";
import JobEditDialog from "@/components/recruiter/jobs/JobEditDialog";

export default function JobsPage() {
  const { data: jobs } = useGetRecruiterJobsQuery();
  const dispatch = useDispatch<AppDispatch>();
  const { isJobDeleteDialogOpen, isJobEditDialogOpen } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    if (jobs) {
      dispatch(setJobs(jobs));
    }
  }, [dispatch, jobs?.length]);

  const navigate = useNavigate();

  const handleDeleteDialogOpen = (index: number, open: boolean) => {
    dispatch(jobDeleteDialogOpen({ index, open }));
  };

  const handleEditDialogOpen = (index: number, open: boolean) => {
    dispatch(jobEditDialogOpen({ index, open }));
  }

  return (
    <div className="px-10 py-7 w-full mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/recruiter/job"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Job
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex mt-8 flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Job </h1>
          </div>
          <p className="text-slate-600 text-lg">
            Manage and view all job in your directory.
          </p>
        </div>

        <Button
          onClick={() => navigate("/recruiter/job/post")}
          className="mt-4 md:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post a Job
        </Button>
      </div>

      <JobFilterComp />

      <JobViewItem jobs={jobs ?? []} onDeleteDialogOpen={handleDeleteDialogOpen} onEditDialogOpen={handleEditDialogOpen} />

      {isJobDeleteDialogOpen && <JobDeleteDialog />}

      {isJobEditDialogOpen && <JobEditDialog />}
    </div>
  );
}
