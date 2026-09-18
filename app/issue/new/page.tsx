"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/components/IssueFormSkeleton";
import delay from "delay";

const IssueForm = dynamic(() => import("@/app/issue/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

await delay(3000);

export default function NewIssuePage() {
  return <IssueForm />;
}
