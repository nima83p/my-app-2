import { Select } from "@radix-ui/themes";
import React from "react";

export default function AssigneeSelect() {
  return (
    <div>
      <Select.Root defaultValue="1">
        <Select.Trigger style={{ width: "180px" }} placeholder="Assign..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>

            <Select.Item value="1">Nima Parastar</Select.Item>
            <Select.Item value="2">Mohammad</Select.Item>
            <Select.Item value="3">Amin</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
