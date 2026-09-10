import React, { Suspense } from "react";
import { Link, Table } from "@radix-ui/themes";
import prisma from "@/lib/prisma";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssueAction from "./IssueAction";
import Loading from "./loading";

async function IssuesTable() {
  const issues = await prisma.issue.findMany();

  // فقط برای تست Loading
  await delay(3000);

  return (
    <div className="w-full max-w-4xl mt-10 sm:mt-16 overflow-x-auto mb-20">
      <Table.Root className="w-full min-w-[600px]">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id} className="align-middle py-0">
              <Table.Cell>
                <Link href={`/issue/${issue.id}`} className="issue-link">
                  {issue.title}
                </Link>
              </Table.Cell>

              <Table.Cell>
                <div className="block">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>

              <Table.Cell>{issue.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default function IssuesPage() {
  return (
    <div className="font-[sans-serif] w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<Loading />}>
        <IssuesTable />
      </Suspense>

      <IssueAction />
    </div>
  );
}
