const Skeleton = ({ className = "", type = "rectangle", width, height, count = 1 }) => {
  // Create an array based on the count
  const elements = Array.from({ length: count }, (_, index) => index);
  
  // Different skeleton types
  const getSkeletonClass = () => {
    const base = "animate-pulse bg-gray-200 dark:bg-gray-700 transition-colors duration-300 rounded";
    
    switch (type) {
      case "circle":
        return `${base} rounded-full`;
      case "text":
        return `${base} h-4`;
      case "title":
        return `${base} h-8`;
      case "button":
        return `${base} h-10 rounded-md`;
      case "avatar":
        return `${base} rounded-full h-12 w-12`;
      case "image":
        return `${base} rounded-md`;
      default:
        return base;
    }
  };
  
  const skeletonClass = getSkeletonClass();
  
  return (
    <>
      {elements.map((item) => (
        <div 
          key={item}
          className={`${skeletonClass} ${className}`}
          style={{ 
            width: width || "100%", 
            height: height || (type === "text" ? "1rem" : type === "title" ? "2rem" : "100%")
          }}
        />
      ))}
    </>
  );
};

export default Skeleton; 