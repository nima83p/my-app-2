"use client";

import { Select } from "@radix-ui/themes";
import React from "react";

type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

const statuses: { label: string; value?: Status | "" }[] = [
  { label: "All", value: "" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export default function StatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter By Status..." />

      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || "ALL"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}