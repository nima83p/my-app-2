import { Status } from "@/app/generated/prisma/client";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: Status;
}

const statusMap: Record<Status, { label: string; color: "green" | "yellow" | "red" }> = {
  OPEN: {
    label: "Open",
    color: "green",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "yellow",
  },
  CLOSED: {
    label: "Closed",
    color: "red",
  },
};

export default function IssueStatusBadge({ status }: Props) {
  const { label, color } = statusMap[status];

  return <Badge color={color}>{label}</Badge>;
}