
import FitnessStory from "../Card/Card";

const FitnessStoriesPage = () => {

  const stories = [
    {
      storyNumber: "01",
      description: "Discover the best gyms near you with GymLink. Whether you're into weightlifting, yoga, or HIIT, our platform helps you find the perfect place to reach your fitness goals. Compare amenities, explore membership options, and read real reviews from fitness enthusiasts like you.Join our community today and take the first step towards a healthier, happier you. With GymLink, finding your ideal gym has never been easier. Start your fitness journey now and unlock exclusive deals and offers tailored just for you.",
      image: "/card1.jpg" // Replace with your actual image path
    },
    {
      storyNumber: "02",
      description: "Join a growing fitness community with GymLink. Connect with top-rated trainers, receive personalized workout plans, and stay motivated through our built-in AI gym assistant and real-time chat support. GymLink is more than just a gym finder—it's your partner in fitness.Whether you're a beginner or a seasoned athlete, our platform provides the tools and resources you need to succeed. Explore our extensive database of gyms, read reviews, and find the perfect match for your fitness journey. Sign up today and experience the GymLink difference.",
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