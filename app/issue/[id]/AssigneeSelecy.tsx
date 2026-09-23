"use client";

import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

type User = {
  id: string;
  name: string | null;
};

export default function AssigneeSelect() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton width={180} height={32} />;
  }

  if (error) {
    return <div>Failed to load users.</div>;
  }

  return (
    <div>
      <Select.Root>
        <Select.Trigger style={{ width: "180px" }} placeholder="Assign..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>

            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
