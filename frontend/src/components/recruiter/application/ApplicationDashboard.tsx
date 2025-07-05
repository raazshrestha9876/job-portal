import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Calendar } from "lucide-react";

export default function JobApplicationsDashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Positions</h1>
          <p className="text-muted-foreground">
            Select a job to view and manage applications
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search jobs by title, company, or department..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const stats = getJobStats(job);
          return (
            <Card
              key={job._id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedJob(job._id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {job.postedDate}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Applications</span>
                    <span className="text-2xl font-bold">{stats.total}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-yellow-600">
                        {stats.pending}
                      </div>
                      <div className="text-muted-foreground">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">
                        {stats.accepted}
                      </div>
                      <div className="text-muted-foreground">Accepted</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-red-600">
                        {stats.rejected}
                      </div>
                      <div className="text-muted-foreground">Rejected</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No jobs found matching your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
