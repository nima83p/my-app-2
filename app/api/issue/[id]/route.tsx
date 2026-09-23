import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { patchIssueSchema } from "@/validationSchemas";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    const issueId = Number(id);

    if (Number.isNaN(issueId)) {
      return NextResponse.json(
        { error: "Invalid issue ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten() },
        { status: 400 }
      );
    }

    const {
      title,
      description,
      assignedToUserId,
    } = validation.data;

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: {
          id: assignedToUserId,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 400 }
        );
      }
    }

    const issue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        title,
        description,
        assignedToUserId,
      },
    });

    return NextResponse.json(issue);
  } catch (error) {
    console.error("UPDATE ISSUE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update issue",
      },
      {
        status: 500,
      }
    );
  }
}