import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  { params }: Props
) {
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

    if (!body.title || !body.description) {
      return NextResponse.json(
        {
          error: "Title and description are required",
        },
        {
          status: 400,
        }
      );
    }

    const issue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        title: body.title,
        description: body.description,
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

export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const issueId = Number(id);

    if (Number.isNaN(issueId)) {
      return NextResponse.json(
        { error: "Invalid issue ID" },
        { status: 400 }
      );
    }

    const issue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    await prisma.issue.delete({
      where: {
        id: issueId,
      },
    });

    return NextResponse.json({
      message: "Issue deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ISSUE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete issue",
      },
      {
        status: 500,
      }
    );
  }
}