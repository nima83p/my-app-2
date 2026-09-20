import React, { Suspense } from "react";

import { Link, Table } from "@radix-ui/themes";

import prisma from "@/lib/prisma";

import IssueStatusBadge from "../components/IssueStatusBadge";

import delay from "delay";

import IssueAction from "./IssueAction";

import Loading from "./loading";

import DeleteIssueButton from "./DeleteIssueButton";

import { auth } from "@/auth";

import { CgDanger } from "react-icons/cg";

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
            <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
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

              <Table.Cell>
                <DeleteIssueButton issueId={issue.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default async function IssuesPage() {
  const session = await auth();

  return (
    <div className="font-[sans-serif] w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {session ? (
        <>
          <Suspense fallback={<Loading />}>
            <IssuesTable />
          </Suspense>

          <IssueAction />
        </>
      ) : (
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center gap-5">
          <CgDanger size='40' color='red'/>

          <p>You must be logged in to watch the Issue Table.</p>
          <Link href="/login" className="mt-4">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}
