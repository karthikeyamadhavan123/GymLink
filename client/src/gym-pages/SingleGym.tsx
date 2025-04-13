import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiMapPin, FiUser, FiPhone, FiMail, FiInfo } from "react-icons/fi";
import { HashLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import Trainers from "./trainers/GymTrainers";

interface SingleGymProps {
  basePrice: number;
  equipments: string[];
  gymImages: string[];
  gymName: string;
  location: {
    area: string;
    city: string;
    landmark: string;
    pincode: string;
    state: string;
    streetName: string;
  };
  owner: {
    firstName: string;
    email: string;
    gender: string;
    phone_number: string;
  };
}

const SingleGym = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const gymUrl = import.meta.env.VITE_DB_URL + `/gym/${id}`;
  const [singleGym, setSingleGym] = useState<SingleGymProps | null>(null);


  useEffect(() => {
    const fetchGym = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(gymUrl, { withCredentials: true });
        if (response.status === 200) {
          const { gym } = response.data;
          setSingleGym(gym);
        }
      } catch (error) {
        console.error("Error fetching gym:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGym();
  }, [gymUrl]);
  // Function to handle image navigation
  const nextImage = () => {
    if (singleGym?.gymImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === singleGym.gymImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (singleGym?.gymImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? singleGym.gymImages.length - 1 : prevIndex - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white h-screen w-full flex justify-center items-center font-stencil">
        <HashLoader size={50} color="#fff" />
      </div>
    );
  }

  if (!singleGym) {
    return (
      <div className="bg-black text-white h-full w-full flex flex-col justify-center items-center font-stencil p-8">
        <h2 className="text-3xl font-bold mb-4">Gym Not Found</h2>
        <p className="text-gray-400">The gym you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{singleGym.gymName} | GymLink</title>
        <meta
          name="description"
          content={`Visit ${singleGym.gymName} in ${singleGym.location.city}. Equipped with ${singleGym.equipments.slice(0, 3).join(', ')} and more. Start your fitness journey at GymLink.`}
        />
        <meta
          name="keywords"
          content={`GymLink, ${singleGym.gymName}, ${singleGym.location.city} gym, fitness, workout, ${singleGym.equipments.slice(0, 3).join(', ')}`}
        />
        <meta
          property="og:title"
          content={`${singleGym.gymName} - Premium Fitness Center | GymLink`}
        />
        <meta
          property="og:description"
          content={`Discover ${singleGym.gymName} in ${singleGym.location.area}, ${singleGym.location.city}. Book sessions starting at $${singleGym.basePrice}/month and access premium equipment.`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-black text-white h-full w-full font-stencil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Gym Header with Name */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-lime-400">{singleGym.gymName}</h1>
            <div className="flex items-center mt-2 text-gray-400">
              <FiMapPin className="mr-2" />
              <span>{singleGym.location.area}, {singleGym.location.city}, {singleGym.location.state}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image Gallery */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-w-16 aspect-h-9">
                {/* Main Image */}
                <div className="h-96 relative">
                  {singleGym.gymImages && singleGym.gymImages.length > 0 ? (
                    <img
                      src={singleGym.gymImages[currentImageIndex]}
                      alt={`${singleGym.gymName} - image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-t-xl">
                      <span className="text-gray-500">No images available</span>
                    </div>
                  )}

                  {/* Image Navigation Arrows */}
                  {singleGym.gymImages && singleGym.gymImages.length > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                        onClick={prevImage}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                        onClick={nextImage}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Row */}
                {singleGym.gymImages && singleGym.gymImages.length > 1 && (
                  <div className="flex overflow-x-auto gap-2 p-2 bg-gray-800 rounded-b-xl">
                    {singleGym.gymImages.map((image, index) => (
                      <div
                        key={index}
                        className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-lime-400' : 'border-transparent'
                          }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Equipment Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FiInfo className="mr-2 text-lime-400" />
                  Available Equipment
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {singleGym.equipments && singleGym.equipments.map((equipment, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 text-center">
                      <span>{equipment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Gym Details */}
            <div className="bg-gray-900 rounded-xl p-6 h-fit">
              {/* Price */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                ₹ Membership
                </h2>
                <div className="bg-black bg-opacity-40 rounded-lg p-4">
                  <div className="text-3xl font-bold text-lime-400">₹{singleGym.basePrice}</div>
                  <div className="text-gray-400">Starting price per month</div>
                </div>
              </div>

              {/* Location Details */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <FiMapPin className="mr-2 text-lime-400" />
                  Location Details
                </h2>
                <div className="bg-black bg-opacity-40 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-gray-400">Street:</span> {singleGym.location.streetName}
                  </div>
                  <div>
                    <span className="text-gray-400">Area:</span> {singleGym.location.area}
                  </div>
                  <div>
                    <span className="text-gray-400">City:</span> {singleGym.location.city}
                  </div>
                  <div>
                    <span className="text-gray-400">State:</span> {singleGym.location.state}
                  </div>
                  <div>
                    <span className="text-gray-400">Pincode:</span> {singleGym.location.pincode}
                  </div>
                  {singleGym.location.landmark && (
                    <div>
                      <span className="text-gray-400">Landmark:</span> {singleGym.location.landmark}
                    </div>
                  )}
                </div>
              </div>

              {/* Owner Information */}
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <FiUser className="mr-2 text-lime-400" />
                  Contact Information
                </h2>
                <div className="bg-black bg-opacity-40 rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <FiUser className="mr-2 text-gray-400" />
                    <span>{singleGym.owner.firstName}</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="mr-2 text-gray-400" />
                    <span>{singleGym.owner.phone_number}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="mr-2 text-gray-400" />
                    <span>{singleGym.owner.email}</span>
                  </div>
                </div>
              </div>

              {/* Join Now Button */}
              <button className="mt-6 w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>
      <Trainers id={id || ''}/>
    </>
  );
};

export default SingleGym;