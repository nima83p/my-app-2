import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createIssueSchema } from "@/validationSchemas";

export async function POST(request: Request) {
  try {
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

    const issue = await prisma.isuue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(issue, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE ISSUE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create issue",
      },
      {
        status: 500,
      }
    );
  }
}