"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import delay from "delay";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  issueId: number;
}

export default function DeleteIssueButton({ issueId }: Props) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);

      // فقط برای تست Spinner
      await delay(3000);

      const response = await fetch(`/api/issue/${issueId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete issue");
      }

      // حذف موفق شد
      setDeleteDialogOpen(false);
      setIsDeleting(false);

      router.push("/issue");
      router.refresh();
    } catch (error) {
      console.error("DELETE ERROR:", error);

      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setErrorOpen(true);
    }
  }

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <AlertDialog.Root
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          // هنگام حذف اجازه بستن مودال را نمی‌دهیم
          if (!isDeleting) {
            setDeleteDialogOpen(open);
          }
        }}
      >
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
          <AlertDialog.Title>
            Delete Issue
          </AlertDialog.Title>

          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue?
            This action cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <Button
              color="red"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <span className="flex items-center gap-2">
                {isDeleting && (
                  <span
                    className="h-4 w-4 animate-spin rounded-full
                               border-2 border-white/40 border-t-white"
                  />
                )}

                {isDeleting ? "Deleting..." : "Delete"}
              </span>
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Error Dialog */}
      <AlertDialog.Root
        open={errorOpen}
        onOpenChange={setErrorOpen}
      >
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title color="red">
            Delete Failed
          </AlertDialog.Title>

          <AlertDialog.Description size="2">
            Something went wrong while deleting this issue.
            Please try again.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Flex gap="3" justify="end">
              <AlertDialog.Action>
                <Button
                  color="red"
                  onClick={() => setErrorOpen(false)}
                >
                  OK
                </Button>
              </AlertDialog.Action>
            </Flex>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
