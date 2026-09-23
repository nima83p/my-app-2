"use client";

import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

type User = {
  id: string;
  name: string | null;
};

export default function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Select.Root>
        <Select.Trigger
          style={{ width: "180px" }}
          placeholder="Assign..."
        />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>

            {users.map((user) => (
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