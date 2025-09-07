import useComments from "@/hooks/useComments";
import CommentPresenter from "./CommentPresenter";
import { HashLoader } from "react-spinners";

const CommentContainer = () => {
  const { comments, loading, error } = useComments();

  if (loading) {
    return (
      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
            <div className="flex flex-col items-center space-y-4">
              <HashLoader size={20} color="#10b981" />
              <p className="text-gray-500 text-sm sm:text-base animate-pulse">
                Loading comments...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
            <div className="text-center">
              <div className="text-red-500 text-sm sm:text-base mb-2">
                Failed to load comments.
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-6 sm:py-12 lg:py-16">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
            Fitness Stories
          </h2>
          <p className="text-xs sm:text-base text-gray-600">
            Real transformations from our amazing customers
          </p>
        </div>
        
        <div className="space-y-6 sm:space-y-12 lg:space-y-16">
          {comments.map((comment) => (
            <CommentPresenter key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentContainer;