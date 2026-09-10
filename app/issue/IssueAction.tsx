import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function IssueAction() {
  return (
    <div>
      <Button
        className="mt-8 mb-20 !bg-black !text-white hover:!bg-gray-800"
      >
        <Link href="/issue/new">New Issue</Link>
      </Button>
    </div>
  );
}