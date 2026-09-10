import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-4xl mt-10 sm:mt-16">

        {/* Title */}
        <h2
          className="
            text-2xl
            font-bold
            tracking-[0.08em]
            mb-6
            text-transparent
            bg-[linear-gradient(to_top,black_0%,black_50%,#e5e5e5_50%,#e5e5e5_100%)]
            bg-[length:100%_200%]
            bg-[position:0_100%]
            bg-clip-text
            [-webkit-background-clip:text]
            [-webkit-text-fill-color:transparent]
            animate-[issueFill_2.5s_ease-in-out_infinite]
          "
        >
          ISSUE
        </h2>

        {/* Skeleton Table */}
        <div className="overflow-x-auto mb-20">
          <Table.Root className="w-full min-w-[600px]">

            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  Issue
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>
                  Status
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>
                  Created
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>
                  Description
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue} className="align-middle">

                  <Table.Cell>
                    <Skeleton />
                  </Table.Cell>

                  <Table.Cell>
                    <Skeleton width={80} />
                  </Table.Cell>

                  <Table.Cell>
                    <Skeleton width={100} />
                  </Table.Cell>

                  <Table.Cell>
                    <Skeleton />
                  </Table.Cell>

                </Table.Row>
              ))}
            </Table.Body>

          </Table.Root>
        </div>

      </div>
    </div>
  );
}