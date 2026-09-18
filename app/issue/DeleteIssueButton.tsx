"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  issueId: number;
}

export default function DeleteIssueButton({ issueId }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);

      const response = await fetch(`/api/issue/${issueId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete issue");
      }

      router.push("/issue");
      router.refresh();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button
          type="button"
          title="Delete issue"
          className="group flex h-9 w-9 items-center justify-center rounded-md
                     text-gray-500 transition-all duration-200
                     hover:bg-red-50 hover:text-red-600
                     active:scale-90"
        >
          <MdDeleteForever
            size={21}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>

        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue?
          This action cannot be undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button
              color="red"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}