import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, Card } from "@radix-ui/themes";
import IssueForm from "@/app/issue/_components/IssueForm";
import delay from "delay";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditIssuePage({ params }: Props) {
  const { id } = await params;

  const issueId = Number(id);

  if (Number.isNaN(issueId)) {
    notFound();
  }

  await delay(3000);

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen px-5 py-10">
      <div className="w-full max-w-4xl mx-auto">

        {/* Top navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/issue/${issue.id}`}>
            <Button variant="soft">
              ← Back to Issue
            </Button>
          </Link>

          <Link href="/issue">
            <Button variant="ghost">
              All Issues
            </Button>
          </Link>
        </div>

        {/* Main card */}
        <Card className="p-6 sm:p-8 shadow-lg">

          {/* Header */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Issue #{issue.id}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-8" />

          {/* Edit form */}
          <IssueForm
            issueId={issue.id}
            defaultValues={{
              title: issue.title,
              description: issue.description,
            }}
          />

        </Card>

        {/* Bottom navigation */}
        <div className="flex justify-between items-center mt-6">
          <Link href={`/issue/${issue.id}`}>
            <Button variant="ghost">
              ← Back to Issue
            </Button>
          </Link>

          <span className="text-sm text-gray-400">
            Issue #{issue.id}
          </span>
        </div>

      </div>
    </main>
  );
}