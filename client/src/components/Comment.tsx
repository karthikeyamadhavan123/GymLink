
import FitnessStory from "../Card/Card";

const FitnessStoriesPage = () => {

  const stories = [
    {
      storyNumber: "01",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/card1.jpg" // Replace with your actual image path
    },
    {
      storyNumber: "02",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/card2.jpg" // Replace with your actual image path
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="pt-10 pb-6 text-center">
        <h1 className="flex justify-center space-x-2 text-4xl font-bold">
          <span className="text-black">FITNESS</span>
          <span className="text-lime-400 underline"> STORIES</span>
        </h1>
      </div>
      
      {/* Stories Container */}
      <div className="container mx-auto px-8 py-4">
        {stories.map((story) => (
          <FitnessStory
            key={story.storyNumber}
            storyNumber={story.storyNumber}
            description={story.description}
            image={story.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FitnessStoriesPage;