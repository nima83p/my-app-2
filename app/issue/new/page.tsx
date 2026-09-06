"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function IssuesPage() {
  return (
    <div className="flex flex-col gap-4 w-2/4 items-center">
      <TextField.Root className="w-3/4" placeholder="Title" />

      <TextArea
        className="w-3/4"
        placeholder="Reply to comment…"
        resize="vertical"
      />

      <Button className="!w-1/2">
        Submit
      </Button>
    </div>
  );
}