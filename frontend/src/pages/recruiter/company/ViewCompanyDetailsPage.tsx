import {

  Building2,
  Calendar,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Edit,
  Trash2,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {  useParams } from "react-router-dom";

import { useGetOwnCompanyDetailsQuery } from "@/redux/services/companyApi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ViewCompanyDetailsPage() {
  const { id } = useParams();

  const { data: company } = useGetOwnCompanyDetailsQuery(id!);

  return (
    <div className="mx-auto px-10 py-7 w-full">
      {/* Header */}
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/recruiter/company/${id}`}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {company?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Content */}
      <div className="space-y-8 mt-8">
        {/* Company Header Card */}
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-xl">
                  <AvatarImage
                    src={company?.logo || "/placeholder.svg?height=96&width=96"}
                    alt={company?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-2xl">
                    {company?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                    {company?.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{company?.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 px-3 py-1"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Established {company?.createdAt.toString().slice(0, 10)}
                  </Badge>
                  {company?.location && (
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 px-3 py-1"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {company.location}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 md:flex-col">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Company Description */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  About Company
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {company?.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                    <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${company?.email}`}
                        className="text-slate-900 hover:text-blue-600 transition-colors font-medium"
                      >
                        {company?.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                    <Phone className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${company?.phone}`}
                        className="text-slate-900 hover:text-blue-600 transition-colors font-medium"
                      >
                        {company?.phone}
                      </a>
                    </div>
                  </div>

                  {company?.location && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                      <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">
                          Location
                        </p>
                        <p className="text-slate-900 font-medium">
                          {company.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {company?.website && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                      <Globe className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">
                          Website
                        </p>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-900 hover:text-blue-600 transition-colors font-medium inline-flex items-center gap-1"
                        >
                          {company.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Company Stats */}
            <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600 font-medium">Company ID</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    {company?._id}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600 font-medium">Date Added</span>
                  <span className="text-slate-900 font-medium">
                    {company?.createdAt.toString().slice(0, 10)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600 font-medium">Status</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {company?.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
