
import React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  MoreHorizontal,
  Search,
  XCircle,
  Eye,
  MessageSquare,
  Building2,
  MapPin,
  Calendar,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock application data for the seeker
const myApplications = [
  {
    _id: "app1",
    job: {
      _id: "job1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
    },
    status: "pending",
    message:
      "I'm excited about this opportunity and believe my 5 years of React experience would be valuable to your team. I've worked on similar projects including e-commerce platforms and SaaS applications, and I'm passionate about creating user-friendly interfaces that drive business results.",
    appliedDate: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-15T10:30:00Z",
    feedback: null,
  },
  {
    _id: "app2",
    job: {
      _id: "job2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $140,000",
    },
    status: "accepted",
    message:
      "I have extensive experience in both frontend and backend development with Node.js and React. I'm particularly interested in working with startups and contributing to innovative products. My experience includes building scalable APIs and modern web applications.",
    appliedDate: "2024-01-14T14:20:00Z",
    lastUpdated: "2024-01-18T09:15:00Z",
    feedback: "Great experience and cultural fit! We'd love to move forward with an interview.",
  },
  {
    _id: "app3",
    job: {
      _id: "job3",
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      type: "Contract",
      salary: "$80,000 - $100,000",
    },
    status: "rejected",
    message:
      "I'm a creative designer with a strong background in user experience design. I believe in creating intuitive and beautiful interfaces that users love to interact with. My portfolio includes work for both B2B and B2C applications.",
    appliedDate: "2024-01-12T11:15:00Z",
    lastUpdated: "2024-01-17T16:30:00Z",
    feedback:
      "Thank you for your interest. We decided to move forward with a candidate with more B2B design experience.",
  },
  {
    _id: "app4",
    job: {
      _id: "job4",
      title: "Backend Developer",
      company: "DataTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 - $150,000",
    },
    status: "pending",
    message:
      "I specialize in building robust backend systems and APIs. My experience with microservices and cloud technologies makes me a great fit for this role. I've worked with Python, Node.js, and have extensive experience with AWS services.",
    appliedDate: "2024-01-11T09:30:00Z",
    lastUpdated: "2024-01-11T09:30:00Z",
    feedback: null,
  },
  {
    _id: "app5",
    job: {
      _id: "job5",
      title: "Product Manager",
      company: "InnovateCorp",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130,000 - $170,000",
    },
    status: "pending",
    message:
      "I'm passionate about product strategy and have 6 years of experience leading cross-functional teams. I've successfully launched multiple products and have a strong background in data-driven decision making and user research.",
    appliedDate: "2024-01-10T16:45:00Z",
    lastUpdated: "2024-01-10T16:45:00Z",
    feedback: null,
  },
  {
    _id: "app6",
    job: {
      _id: "job6",
      title: "DevOps Engineer",
      company: "CloudFirst Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$115,000 - $145,000",
    },
    status: "accepted",
    message:
      "I have extensive experience with cloud infrastructure, CI/CD pipelines, and containerization. I'm excited about the opportunity to help scale your infrastructure and improve deployment processes.",
    appliedDate: "2024-01-08T13:20:00Z",
    lastUpdated: "2024-01-16T11:45:00Z",
    feedback: "Impressive background in DevOps! Let's schedule a technical interview.",
  },
]

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "secondary" as const,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle,
    variant: "default" as const,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    variant: "destructive" as const,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
}

export default function SeekerApplicationsHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<(typeof myApplications)[0] | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredApplications = myApplications.filter((app) => {
    const matchesSearch =
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesTab = selectedTab === "all" || app.status === selectedTab

    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusCounts = () => {
    return {
      all: myApplications.length,
      pending: myApplications.filter((app) => app.status === "pending").length,
      accepted: myApplications.filter((app) => app.status === "accepted").length,
      rejected: myApplications.filter((app) => app.status === "rejected").length,
    }
  }

  const statusCounts = getStatusCounts()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const handleViewDetails = (application: (typeof myApplications)[0]) => {
    setSelectedApplication(application)
    setShowDetailsModal(true)
  }

  const handleWithdrawApplication = (applicationId: string) => {
    console.log(`Withdrawing application ${applicationId}`)
    // In a real app, this would make an API call
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground">Track the status of your job applications</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by job title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.all}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.accepted}</p>
                <p className="text-sm text-muted-foreground">Accepted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.rejected}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({statusCounts.accepted})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({statusCounts.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job & Company</TableHead>
                      <TableHead>Location & Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No applications found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredApplications.map((application) => {
                        const StatusIcon = statusConfig[application.status as keyof typeof statusConfig].icon
                        return (
                          <TableRow key={application._id}>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{application.job.title}</div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Building2 className="h-3 w-3" />
                                  {application.job.company}
                                </div>
                                <div className="text-xs text-muted-foreground">{application.job.salary}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <MapPin className="h-3 w-3" />
                                  {application.job.location}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {application.job.type}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={statusConfig[application.status as keyof typeof statusConfig].variant}>
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {statusConfig[application.status as keyof typeof statusConfig].label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm">{formatDate(application.appliedDate)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {getTimeAgo(application.appliedDate)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm">{formatDate(application.lastUpdated)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {getTimeAgo(application.lastUpdated)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleViewDetails(application)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Job Posting
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {application.status === "pending" && (
                                    <DropdownMenuItem
                                      onClick={() => handleWithdrawApplication(application._id)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Withdraw Application
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedApplication?.job.title}</DialogTitle>
            <DialogDescription>
              {selectedApplication?.job.company} • {selectedApplication?.job.location}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6 py-4">
              {/* Status and Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Application Status</h4>
                  <Badge
                    variant={statusConfig[selectedApplication.status as keyof typeof statusConfig].variant}
                    className="w-fit"
                  >
                    {React.createElement(statusConfig[selectedApplication.status as keyof typeof statusConfig].icon, {
                      className: "mr-1 h-3 w-3",
                    })}
                    {statusConfig[selectedApplication.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Applied Date</h4>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedApplication.appliedDate)}</p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Job Details</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Salary:</span> {selectedApplication.job.salary}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {selectedApplication.job.type}
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Message */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Your Application Message</h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedApplication.message}</p>
                </div>
              </div>

              {/* Feedback */}
              {selectedApplication.feedback && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Recruiter Feedback</h4>
                  <div
                    className={`p-4 rounded-lg ${
                      statusConfig[selectedApplication.status as keyof typeof statusConfig].bgColor
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{selectedApplication.feedback}</p>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Applied on {formatDate(selectedApplication.appliedDate)}</span>
                  </div>
                  {selectedApplication.lastUpdated !== selectedApplication.appliedDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Last updated on {formatDate(selectedApplication.lastUpdated)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
