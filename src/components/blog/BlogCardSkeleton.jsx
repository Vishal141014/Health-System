import Skeleton from "../ui/Skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-darkSurface rounded-2xl shadow-md overflow-hidden transition-colors duration-300">
      <div className="h-48">
        <Skeleton type="image" height="192px" />
      </div>
      
      <div className="p-5 space-y-3">
        <Skeleton type="title" className="w-3/4" />
        
        <div className="flex items-center space-x-4">
          <Skeleton type="text" className="w-1/3" />
          <Skeleton type="text" className="w-1/3" />
        </div>
        
        <Skeleton type="text" count={3} className="mb-1" />
        
        <div className="pt-2">
          <Skeleton type="button" className="w-28" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton; 