import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Loader } from "lucide-react";
import type { z } from "zod";
import { postJobSchema } from "@/schema/job.schema";
import { useUpdateJobMutation } from "@/redux/services/jobApi";
import type { ICompany } from "@/redux/types/company";
import { useSelectedJob } from "@/hooks/useSelectedJob";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store/store";
import { jobEditDialogOpen } from "@/redux/slice/job";

const JobEditDialog = () => {
  const [updateJob, { isLoading }] = useUpdateJobMutation();
  const dispatch = useDispatch<AppDispatch>();
  const { isJobEditDialogOpen } = useSelector((state: RootState) => state.jobs);
  const { companies } = useSelector((state: RootState) => state.companies);

  const selectedJob = useSelectedJob();

  const form = useForm<z.infer<typeof postJobSchema>>({
    resolver: zodResolver(postJobSchema),

    defaultValues: {
      title: selectedJob?.title || "",
      description: selectedJob?.description || "",
      salary: selectedJob?.salary || 0,
      companyId: selectedJob?.company?._id || "",
      location: selectedJob?.location || "",
      jobType: [
        "full-time",
        "part-time",
        "contract",
        "internship",
        "remote",
      ].includes(selectedJob?.jobType)
        ? (selectedJob?.jobType as
            | "full-time"
            | "part-time"
            | "contract"
            | "internship"
            | "remote")
        : "full-time",
      experience:
        typeof selectedJob?.experience === "string"
          ? Number(selectedJob?.experience) || 0
          : selectedJob?.experience || 0,
      position:
        typeof selectedJob?.position === "string"
          ? Number(selectedJob?.position) || 0
          : selectedJob?.position || 0,
      requirements: selectedJob?.requirements || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements",
  });

  async function onSubmit(data: z.infer<typeof postJobSchema>) {
    try {
      await updateJob({ data, id: selectedJob?._id });
      handleEditDialogClose();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditDialogClose = () => {
    dispatch(
      jobEditDialogOpen({
        index: -1,
        open: false,
      })
    );
  };

  return (
    <Dialog open={isJobEditDialogOpen} onOpenChange={handleEditDialogClose}>
      <DialogContent className="w-full sm:min-w-[500px] md:min-w-[750px] lg:min-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <div className="mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {companies.find(
                                  (company) => company._id === field.value
                                )?.name || "Select Company"}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companies.map((company: ICompany) => (
                              <SelectItem value={company._id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience (Years)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Experience"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50000"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Positions Available</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            placeholder="Remote, New York, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="mb-[34px]">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">
                              Internship
                            </SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Requirements</FormLabel>
                    <div className="space-y-3">
                      {fields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`requirements.${index}`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input
                                    placeholder="e.g. 3+ years of React experience"
                                    className="mt-4"
                                    {...field}
                                  />
                                </FormControl>
                                {fields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => remove(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append("")}
                        className="flex items-center gap-2 mt-3"
                      >
                        <Plus className="h-4 w-4" />
                        Add Requirement
                      </Button>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the role, responsibilities, and what you're looking for..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-6 w-[300px] ml-auto">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button
                    onClick={() => handleEditDialogClose()}
                    type="button"
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default JobEditDialog;
