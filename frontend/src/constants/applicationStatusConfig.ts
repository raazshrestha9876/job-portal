import { CheckCircle, Clock, XCircle } from "lucide-react";

export const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "secondary" as const,
    color: "text-yellow-600",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle,
    variant: "default" as const,
    color: "text-green-600",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    variant: "destructive" as const,
    color: "text-red-600",
  },
};
