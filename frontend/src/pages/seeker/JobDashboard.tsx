"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  MapPin,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Send,
  CheckCircle,
} from "lucide-react";

// Mock job data for seekers
const availableJobs = [
  {
    _id: "job1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: true,
    salary: "$120,000 - $160,000",
    experience: "5+ years",
    postedDate: "2024-01-10T00:00:00Z",
    description:
      "We're looking for a Senior Frontend Developer to join our growing engineering team. You'll be working on cutting-edge web applications using React, TypeScript, and modern frontend technologies.",
    requirements: [
      "5+ years of experience with React and JavaScript",
      "Strong knowledge of TypeScript",
      "Experience with modern CSS frameworks",
      "Understanding of web performance optimization",
      "Experience with testing frameworks",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO",
    ],
    applicationCount: 12,
    status: "active",
  },
  {
    _id: "job2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    remote: true,
    salary: "$100,000 - $140,000",
    experience: "3+ years",
    postedDate: "2024-01-08T00:00:00Z",
    description:
      "Join our fast-growing startup as a Full Stack Engineer. You'll work across our entire technology stack, building features that directly impact our users and business growth.",
    requirements: [
      "3+ years of full-stack development experience",
      "Proficiency in Node.js and React",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Knowledge of cloud platforms (AWS, GCP)",
      "Strong problem-solving skills",
    ],
    benefits: [
      "Equity package",
      "Health insurance",
      "Remote-first culture",
      "Learning and development budget",
      "Flexible hours",
    ],
    applicationCount: 8,
    status: "active",
  },
  {
    _id: "job3",
    title: "UI/UX Designer",
    company: "DesignStudio",
    department: "Design",
    location: "New York, NY",
    type: "Contract",
    remote: false,
    salary: "$80,000 - $100,000",
    experience: "4+ years",
    postedDate: "2024-01-05T00:00:00Z",
    description:
      "We're seeking a talented UI/UX Designer to create beautiful and intuitive user experiences. You'll work closely with our product and engineering teams to design user-centered solutions.",
    requirements: [
      "4+ years of UI/UX design experience",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating design process",
      "Experience with user research and testing",
      "Understanding of design systems",
    ],
    benefits: [
      "Competitive hourly rate",
      "Creative freedom",
      "Collaborative environment",
      "Professional development opportunities",
      "Modern design tools and equipment",
    ],
    applicationCount: 15,
    status: "active",
  },
  {
    _id: "job4",
    title: "Backend Developer",
    company: "DataTech Solutions",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    remote: true,
    salary: "$110,000 - $150,000",
    experience: "4+ years",
    postedDate: "2024-01-03T00:00:00Z",
    description:
      "Looking for a Backend Developer to build and maintain scalable server-side applications. You'll work with microservices, APIs, and cloud infrastructure.",
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Python or Node.js",
      "Experience with microservices architecture",
      "Database design and optimization skills",
      "Cloud platform experience (AWS, Azure)",
    ],
    benefits: [
      "Competitive salary",
      "Stock options",
      "Comprehensive health benefits",
      "Remote work flexibility",
      "Tech conference budget",
    ],
    applicationCount: 6,
    status: "active",
  },
  {
    _id: "job5",
    title: "Product Manager",
    company: "InnovateCorp",
    department: "Product",
    location: "Seattle, WA",
    type: "Full-time",
    remote: true,
    salary: "$130,000 - $170,000",
    experience: "5+ years",
    postedDate: "2024-01-01T00:00:00Z",
    description:
      "We're looking for an experienced Product Manager to drive product strategy and execution. You'll work cross-functionally to deliver products that delight our customers.",
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and strategic thinking skills",
      "Experience with agile development methodologies",
      "Excellent communication and leadership skills",
      "Data-driven decision making approach",
    ],
    benefits: [
      "Competitive salary and bonus",
      "Equity participation",
      "Premium health benefits",
      "Flexible work arrangements",
      "Professional development budget",
    ],
    applicationCount: 20,
    status: "active",
  },
];

export default function JobDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<
    (typeof availableJobs)[0] | null
  >(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const filteredJobs = availableJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "remote" && job.remote) ||
      (locationFilter === "onsite" && !job.remote) ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      job.type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesLocation && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleApplyClick = (job: (typeof availableJobs)[0]) => {
    if (appliedJobs.includes(job._id)) {
      return;
    }
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async () => {
    if (!applicationMessage.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add job to applied jobs
    setAppliedJobs([...appliedJobs, selectedJob!._id]);

    setShowApplicationModal(false);
    setApplicationMessage("");
    setSelectedJob(null);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Find Your Next Job
          </h1>
          <p className="text-muted-foreground">
            Discover opportunities that match your skills and interests
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs by title, company, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="austin">Austin</SelectItem>
              <SelectItem value="seattle">Seattle</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs.includes(job._id);
          return (
            <Card key={job._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-base font-medium">
                      {job.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={job.remote ? "default" : "secondary"}>
                      {job.remote ? "Remote" : "On-site"}
                    </Badge>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {job.experience}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(job.postedDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {job.applicationCount} applicants
                    </div>
                  </div>
                  <Button
                    onClick={() => handleApplyClick(job)}
                    disabled={isApplied}
                    className={
                      isApplied ? "bg-green-600 hover:bg-green-600" : ""
                    }
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Applied
                      </>
                    ) : (
                      "Apply Now"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria to find more opportunities.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Modal */}
      <Dialog
        open={showApplicationModal}
        onOpenChange={setShowApplicationModal}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {selectedJob?.company} • {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">
                Why are you interested in this position?
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your experience, skills, and why you're excited about this opportunity..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                className="min-h-[120px]"
                maxLength={1000}
              />
              <div className="text-xs text-muted-foreground text-right">
                {applicationMessage.length}/1000 characters
              </div>
            </div>

            {selectedJob && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Job Summary:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">Salary:</span>{" "}
                    {selectedJob.salary}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span>{" "}
                    {selectedJob.experience}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>{" "}
                    {selectedJob.type}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{" "}
                    {selectedJob.location}
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApplicationModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitApplication}
              disabled={isSubmitting || !applicationMessage.trim()}
            >
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
