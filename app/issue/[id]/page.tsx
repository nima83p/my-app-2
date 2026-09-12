import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, Card, Flex, Badge } from "@radix-ui/themes";
import delay from "delay";
import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  await delay(3000);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
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
          <Link href="/issue">
            <Button variant="soft">← Back to Issues</Button>
          </Link>

          <Link href={`/issue/${issue.id}/edit`}>
            <Button className="flex items-center gap-2">
              Edit Issue
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>

        {/* Main card */}
        <Card className="p-6 sm:p-8 shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div>
              <p className="text-sm text-gray-500 mb-2">Issue #{issue.id}</p>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {issue.title}
              </h1>
            </div>

            <Badge
              size="2"
              color={
                issue.status === "OPEN"
                  ? "red"
                  : issue.status === "IN_PROGRESS"
                    ? "orange"
                    : "green"
              }
            >
              {issue.status.replace("_", " ")}
            </Badge>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-8" />

          {/* Metadata */}
          <Flex
            direction={{ initial: "column", sm: "row" }}
            gap="6"
            className="mb-8"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                Created
              </p>

              <p className="text-sm font-medium">
                {issue.createdAt.toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                Last Updated
              </p>

              <p className="text-sm font-medium">
                {issue.updatedAt.toLocaleDateString()}
              </p>
            </div>
          </Flex>

          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Description</h2>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 sm:p-6">
              <div className="prose prose-gray max-w-none">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
              </div>
            </div>
          </section>
        </Card>

        {/* Bottom navigation */}
        <div className="flex justify-between items-center mt-6">
          <Link href="/issue">
            <Button variant="ghost">← All Issues</Button>
          </Link>

          <span className="text-sm text-gray-400">Issue #{issue.id}</span>
        </div>
      </div>
    </main>
  );
}
