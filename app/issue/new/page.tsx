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

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

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

export default function IssuesPage() {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
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

            await axios.post("/api/issue", data);

            router.push("/issue");
          } catch (error) {
            setError("Something went wrong.");
            console.log(error);
          }
        })}
        className="flex flex-col gap-4 w-2/4 items-center"
      >
        <TextField.Root
          className="w-3/4"
          placeholder="Title"
          {...register("title")}
        />

        {errors.title && (
          <p className="w-3/4 text-sm text-red-500 bg-red-100 rounded p-2">{errors.title.message}</p>
        )}

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
          {errors.description && (
            <p className="mt-1 text-sm text-red-500 bg-red-100 rounded p-2">
              {errors.description.message}
            </p>
          )}
        </div>

        <Button type="submit" className="submit-button !w-1/2">
          Submit New Issue
        </Button>
      </form>
    </div>
  );
}
