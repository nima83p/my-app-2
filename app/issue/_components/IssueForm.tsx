"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import type { Options } from "easymde";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/validationSchemas";
import ErrorMassage from "@/app/components/errorMassage";
import Spinner from "@/app/components/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueFormProps {
  issueId?: number;
  defaultValues?: {
    title: string;
    description: string;
  };
}

type IssueFormData = z.infer<typeof createIssueSchema>;

const editorOptions: Options = {
  autofocus: false,
  spellChecker: true,
  status: false,
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "image",
    "code",
    "|",
    "preview",
    "side-by-side",
    "fullscreen",
  ],
  toolbarTips: true,
  placeholder: "Write your issue description...",
};

export default function IssuesPage({ issueId, defaultValues }: IssueFormProps) {
  const router = useRouter();

  const [error, setError] = useState("");
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
    },
  });

  return (
    <div className="w-full flex flex-col items-center">
      {error && (
        <Callout.Root color="red" className="w-2/5 mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setError("");

            await sleep(3000);

            if (issueId) {
              await axios.patch(`/api/issue/${issueId}`, data);
            } else {
              await axios.post("/api/issue", data);
            }

            router.push("/issue");
          } catch (error) {
            setError("Something went wrong.");
            console.log(error);
          }
        })}
        className="flex flex-col gap-4 w-2/4 items-center"
      >
        <div className="w-3/4">
          <TextField.Root
            className="w-full"
            placeholder="Title"
            {...register("title")}
          />

          <ErrorMassage>{errors.title?.message}</ErrorMassage>
        </div>

        <div className="w-3/4">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                value={field.value}
                onChange={field.onChange}
                options={editorOptions}
              />
            )}
          />

          <ErrorMassage>{errors.description?.message}</ErrorMassage>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="submit-button !w-1/2 !min-w-[180px] whitespace-nowrap"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner />
              Loading...
            </div>
          ) : issueId ? (
            "Update Issue"
          ) : (
            "Submit New Issue"
          )}
        </Button>
      </form>
    </div>
  );
}
