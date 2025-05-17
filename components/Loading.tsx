export default function LoadingSkeleton({ count = 10 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-300 p-4 rounded flex flex-col items-center animate-pulse"
        >
          <div className="w-24 h-24 rounded-lg bg-gray-200 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-4/6"></div>
        </div>
      ))}
    </>
  );
}
