import { Card, Flex, Badge } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <main className="w-full min-h-screen px-5 py-10">
      <div className="w-full max-w-4xl mx-auto">
        {/* Title */}
        <h2
          className="
            text-2xl
            font-bold
            tracking-[0.08em]
            mb-8
            text-transparent
            bg-[linear-gradient(to_top,#000_50%,#d1d5db_50%)]
            bg-[length:100%_200%]
            bg-clip-text
            animate-[issueFill_2.5s_ease-in-out_infinite]
        "
        >
          DETAIL
        </h2>
        {/* Top navigation */}
        <div className="flex items-center justify-between mb-8">
          <Skeleton width={130} height={36} />
          <Skeleton width={100} height={36} />
        </div>

        {/* Main card */}
        <Card className="p-6 sm:p-8 shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div className="w-full">
              <div className="mb-3">
                <Skeleton width={80} height={16} />
              </div>

              <Skeleton width="65%" height={42} />
            </div>

            <div>
              <Skeleton width={90} height={28} />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-8" />

          {/* Metadata */}
          <Flex
            direction={{ initial: "column", sm: "row" }}
            gap="6"
            className="mb-8"
          >
            <div>
              <Skeleton width={55} height={12} />
              <div className="mt-2">
                <Skeleton width={100} height={18} />
              </div>
            </div>

            <div>
              <Skeleton width={90} height={12} />
              <div className="mt-2">
                <Skeleton width={100} height={18} />
              </div>
            </div>
          </Flex>

          {/* Description */}
          <section>
            <div className="mb-4">
              <Skeleton width={100} height={22} />
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 sm:p-6">
              <Skeleton count={5} height={18} />
            </div>
          </section>
        </Card>

        {/* Bottom navigation */}
        <div className="flex justify-between items-center mt-6">
          <Skeleton width={110} height={36} />
          <Skeleton width={80} height={18} />
        </div>
      </div>
    </main>
  );
}
