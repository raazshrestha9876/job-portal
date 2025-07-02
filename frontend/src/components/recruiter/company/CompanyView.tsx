import { Link } from "react-router-dom";

import {
  Building2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCompanyQuery } from "@/redux/services/companyApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "@/redux/store/store";
import { setCompanies } from "@/redux/slice/company";

interface CompanyViewProps {
  onDeleteDialogOpen: (index: number, open: boolean) => void;
}

const CompanyView = ({ onDeleteDialogOpen }: CompanyViewProps) => {
  const { data: companies } = useGetCompanyQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (companies) {
      dispatch(setCompanies(companies));
    }
  }, [dispatch, companies?.length]);

  return (
    <>
      {companies?.length === 0 ? (
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-24">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-full">
                <Building2 className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            <div className="text-center space-y-4 max-w-md">
              <h3 className="text-2xl font-bold text-slate-900">
                No companies found
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Get started by adding your first company to the directory.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link to={"/recruiter/company/add"}>
                  <Plus className="mr-2 h-5 w-5" />
                  Add Company
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {companies?.map((company, index) => (
            <Card
              key={company._id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14 ring-4 ring-white shadow-lg">
                      <AvatarImage
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                        {company.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl truncate font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {company.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <span className="text-slate-600 font-medium">
                        {company.email}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                <p className="text-slate-700 line-clamp-3 leading-relaxed ">
                  {company.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span className="text-slate-700">{company.phone}</span>
                  </div>

                  {company.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="text-slate-700">{company.location}</span>
                    </div>
                  )}

                  {company.website && (
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 hover:underline truncate transition-colors"
                      >
                        {company.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-medium px-3 py-1"
                  >
                    {new Date(company.createdAt).toLocaleDateString()}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-transparent"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 bg-transparent"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDeleteDialogOpen(index, true)}
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200 bg-transparent"
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

export default CompanyView;
