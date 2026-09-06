"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function IssuesPage() {
  return (
    <div className="flex flex-col gap-4 w-2/4 items-center">
      <TextField.Root className="w-3/4" placeholder="Title" />

      <SimpleMDE
        className="w-5/4"
        placeholder="Reply to comment…"
      />

      <Button className="!w-1/2">
        Submit New Issue
      </Button>
    </div>
  );
}