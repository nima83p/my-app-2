export default function IssueFormSkeleton() {
  return (
    <div className="w-full flex flex-col items-center animate-pulse">
      <div className="flex flex-col gap-4 w-2/4 items-center">
        
        {/* Title */}
        <div className="w-3/4">
          <div className="h-10 w-full rounded-md bg-gray-200" />
        </div>

        {/* Description / Editor */}
        <div className="w-3/4">
          <div className="h-[300px] w-full rounded-md bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-10 w-1/2 min-w-[180px] rounded-md bg-gray-200" />

      </div>
    </div>
  );
}