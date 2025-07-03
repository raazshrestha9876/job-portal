import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  MapPin,
  DollarSign,
  Clock,
  Users,
  Building2,
  Briefcase,
} from "lucide-react";
import type { IJobs } from "@/redux/types/job";
import { useNavigate } from "react-router-dom";

interface JobViewItemProps {
  jobs: IJobs[];
  onDeleteDialogOpen: (index: number, open: boolean) => void;
  onEditDialogOpen: (index: number, open: boolean) => void;
}

const JobViewItem = ({
  jobs,
  onDeleteDialogOpen,
  onEditDialogOpen,
}: JobViewItemProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const now = new Date();
    const jobDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - jobDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <>
      {jobs?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button>Clear Filters</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs?.map((job, index) => (
            <Card
              key={job._id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1 line-clamp-2">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mb-2">
                      <Building2 className="h-3 w-3" />
                      {job.company?.name}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {job.jobType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span>{job.salary}/year</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{job.experience}+ years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span>
                      {job.position} position
                      {Number(job.position) > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(job.createdAt.toString())}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/recruiter/job/${job._id}`)}
                      size="sm"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => onEditDialogOpen(index, true)}
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDeleteDialogOpen(index, true)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default JobViewItem;
