import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { updateCompanySchema } from "@/schema/company.schema";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { type AppDispatch, type RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCompanyMutation } from "@/redux/services/companyApi";
import { companyEditSheetOpen } from "@/redux/slice/company";
import { useSelectedCompany } from "@/hooks/useSelectedCompany";

const CompanyEditSheet = () => {
  const { isCompanyEditSheetOpen } = useSelector(
    (state: RootState) => state.companies
  );
  const dispatch = useDispatch<AppDispatch>();
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();
  const selectedCompany = useSelectedCompany();

  const form = useForm({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      name: selectedCompany?.name || "",
      description: selectedCompany?.description || "",
      location: selectedCompany?.location || "",
      website: selectedCompany?.website || "",
      logo: selectedCompany?.logo || "",
      email: selectedCompany?.email || "",
      phone: selectedCompany?.phone || "",
    },
  });


  async function onSubmit(data: z.infer<typeof updateCompanySchema>) {
    try {
      await updateCompany({ id: selectedCompany?._id, data }).unwrap();
      handleEditSheetClose();
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditSheetClose = () => {
    dispatch(companyEditSheetOpen({ index: -1, open: false }));
  };

  return (
    <Sheet open={isCompanyEditSheetOpen} onOpenChange={handleEditSheetClose}>
      <SheetContent className="px-8 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="font-semibold text-2xl mt-4">
            Edit Company
          </SheetTitle>
        </SheetHeader>
   
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 w-full"
                          placeholder="Enter company name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 w-full"
                          type="email"
                          placeholder="company@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 w-full"
                        placeholder="+1 (555) 123-4567"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 w-full"
                        placeholder="City, Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what the company does..."
                        className="min-h-[100px] w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 w-full"
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 w-full"
                        placeholder="https://example.com/logo.png"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    form.reset({
                      name: "",
                      description: "",
                      location: "",
                      email: "",
                      phone: "",
                      website: "",
                      logo: "",
                    })
                  }
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
    
      </SheetContent>
    </Sheet>
  );
};

export default CompanyEditSheet;
