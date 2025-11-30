import { useState, useEffect } from "react";

export interface Comment {
    id:string
    storyNumber:string; // number or string depending on your data
    image: string;                 // URL of the image
    description: string;           // Comment/description text
}


const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          
          const stories = [
            {
              id: "1",
              storyNumber: "01",
              description: "Discover the best gyms near you with GymLink. Whether you're into weightlifting, yoga, or HIIT, our platform helps you find the perfect place to reach your fitness goals. Compare amenities, explore membership options, and read real reviews from fitness enthusiasts like you.Join our community today and take the first step towards a healthier, happier you. With GymLink, finding your ideal gym has never been easier. Start your fitness journey now and unlock exclusive deals and offers tailored just for you.",
              image: "/assets/images/gym/user1.avif"
            },
            {
              id: "2",
              storyNumber: "02",
              description: "Join a growing fitness community with GymLink. Connect with top-rated trainers, receive personalized workout plans, and stay motivated through our built-in AI gym assistant and real-time chat support. GymLink is more than just a gym finder—it's your partner in fitness.Whether you're a beginner or a seasoned athlete, our platform provides the tools and resources you need to succeed. Explore our extensive database of gyms, read reviews, and find the perfect match for your fitness journey. Sign up today and experience the GymLink difference.",
              image: "/assets/images/gym/user2.avif"
            }
          ];
          setComments(stories);
          
        }, 500);
      } catch (err) {
        setError("Failed to load comments");
        setLoading(false);
      }
      finally{
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return { comments, loading, error };
};
export default useComments;
