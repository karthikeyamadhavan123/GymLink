import { FiMapPin, FiUser, FiPhone, FiMail, FiInfo } from "react-icons/fi";
import { HashLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import Trainers from "@/gym-pages/trainers/GymTrainers";
import { useParams } from "react-router-dom";
import { useSingleGym } from "@/hooks/useSingleGym";

const SingleGym = () => {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    singleGym,
    currentImageIndex,
    nextImage,
    prevImage,
    setCurrentImageIndex,
  } = useSingleGym(id);

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
      {/* META TAGS */}
      <Helmet>
        <title>{singleGym.gymName} | GymLink</title>
        <meta
          name="description"
          content={`Visit ${singleGym.gymName} in ${singleGym.location.city}. Equipped with ${singleGym.equipments
            .slice(0, 3)
            .join(", ")} and more.`}
        />
      </Helmet>

      {/* MAIN UI */}
      <div className="bg-black text-white h-full w-full font-stencil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-lime-400">
              {singleGym.gymName}
            </h1>
            <div className="flex items-center mt-2 text-gray-400">
              <FiMapPin className="mr-2" />
              <span>
                {singleGym.location.area}, {singleGym.location.city},{" "}
                {singleGym.location.state}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* IMAGES */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl bg-gray-900">
                <div className="h-96 relative">

                  <img
                    src={singleGym.gymImages[currentImageIndex]}
                    className="w-full h-full object-cover rounded-t-xl"
                  />

                  {/* ARROWS */}
                  {singleGym.gymImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                      >
                        ◀
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                      >
                        ▶
                      </button>
                    </>
                  )}
                </div>

                {/* THUMBNAILS */}
                <div className="flex overflow-x-auto gap-2 p-2 bg-gray-800 rounded-b-xl">
                  {singleGym.gymImages.map((img, i) => (
                    <div
                      key={i}
                      className={`w-20 h-20 cursor-pointer rounded-md overflow-hidden border-2 ${currentImageIndex === i
                          ? "border-lime-400"
                          : "border-transparent"
                        }`}
                      onClick={() => setCurrentImageIndex(i)}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* EQUIPMENT LIST */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  <FiInfo className="inline mr-2 text-lime-400" />
                  Available Equipment
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {singleGym.equipments.map((eq, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-4 text-center">
                      {eq}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR DETAILS */}
            <div className="bg-gray-900 rounded-xl p-6 h-fit">

              {/* PRICE */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">₹ Membership</h2>
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-3xl font-bold text-lime-400">
                    ₹{singleGym.basePrice}
                  </div>
                  <p className="text-gray-400">Starting price per month</p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  <FiMapPin className="inline mr-2 text-lime-400" />
                  Location Details
                </h2>

                <div className="bg-black/40 rounded-lg p-4 space-y-2">
                  <p>Street: {singleGym.location.streetName}</p>
                  <p>Area: {singleGym.location.area}</p>
                  <p>City: {singleGym.location.city}</p>
                  <p>State: {singleGym.location.state}</p>
                  <p>Pincode: {singleGym.location.pincode}</p>
                </div>
              </div>

              {/* CONTACT */}
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  <FiUser className="inline mr-2 text-lime-400" />
                  Contact Information
                </h2>

                <div className="bg-black/40 rounded-lg p-4 space-y-3">
                  <p className="flex items-center">
                    <FiUser className="mr-2" />
                    {singleGym.owner.firstName}
                  </p>

                  <p className="flex items-center">
                    <FiPhone className="mr-2" />
                    {singleGym.owner.phone_number}
                  </p>

                  <p className="flex items-center">
                    <FiMail className="mr-2" />
                    {singleGym.owner.email}
                  </p>
                </div>
              </div>

              <button className="mt-6 w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 rounded-lg">
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <Trainers id={id || ""} />
    </>
  );
};

export default SingleGym;
