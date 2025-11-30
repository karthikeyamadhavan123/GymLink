import axios from "axios"
import { useEffect, useState } from "react"
import { Phone, Award, Briefcase, Tag } from "lucide-react"
import { HashLoader } from "react-spinners"
import { UserTrainerProps } from "./types/types"



const Trainers = ({ id }: { id: string }) => {
  const gymTrainerUrl = import.meta.env.VITE_DB_URL + `/trainers/${id}/all`;
  const [trainers, setTrainers] = useState<UserTrainerProps[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true)
      try {
        const response = await axios.get(gymTrainerUrl, { withCredentials: true })
        if (response.status === 200) {
          setTrainers(response.data.trainer.trainers)
        }
      } catch (error) {
        console.error("Failed to fetch trainers:", error)
        setError("Failed to load trainers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchTrainers()
  }, [gymTrainerUrl])

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-stencil">
        <div className="text-xl">
            <HashLoader color="#fff" size={20}/>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-stencil">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 md:px-8 font-stencil cursor-pointer">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Expert Trainers</h1>
      
      {trainers.length === 0 ? (
        <div className="text-center text-xl">No trainers available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="h-64 overflow-hidden">
                <img 
                  src={trainer.trainerImage || "/api/placeholder/400/320"} 
                  alt={trainer.trainerName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{trainer.trainerName}</h2>
                
                <div className="flex items-center mb-2">
                  <Briefcase size={18} className="mr-2 text-lime-500" />
                  <span>{trainer.experience} years experience</span>
                </div>
                
                <div className="flex items-start mb-2">
                  <Award size={18} className="mr-2 mt-1 text-lime-500" />
                  <a href={trainer.certifications} target="_blank">Certification</a>
                </div>
                
                <div className="flex items-center mb-4">
                  <Phone size={18} className="mr-2 text-lime-500" />
                  <span>{trainer.contactNumber}</span>
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-3">Achievements: {trainer.description}</p>
                
                <div className="mt-4">
                  <div className="flex items-start mb-1">
                    <Tag size={18} className="mr-2 mt-1 text-lime-400" />
                    <span className="font-semibold">Specialties:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {trainer.expertise.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-800 text-lime-400 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Trainers