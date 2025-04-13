import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Award, Search } from 'lucide-react'

interface TrainerProps {
  certifications: string
  contactNumber: string
  description: string
  experience: number
  expertise: string[]
  trainerImage: string
  trainerName: string
  _id: string
  gymId: {
    location: {
      area: string;
      city: string;
      landmark: string;
      pincode: string;
      state: string;
      streetName: string;
    };
    gymName: string;
  }
}

const AllTrainers = () => {
  const allTrainerUrl = import.meta.env.VITE_DB_URL + `/trainers/all`;
  const [trainers, setTrainers] = useState<TrainerProps[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterByExpertise, setFilterByExpertise] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true)
      try {
        const response = await axios.get(allTrainerUrl, { withCredentials: true })
        setTrainers(response.data.trainer)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching trainers:', err)
        setError('Failed to load trainers. Please try again later.')
      }
      finally{
        setLoading(false)

      }
    }
    fetchTrainers();
  }, [allTrainerUrl])
  const allExpertise = trainers.reduce((acc: string[], trainer) => {
    trainer.expertise.forEach(skill => {
      if (!acc.includes(skill)) {
        acc.push(skill)
      }
    })
    return acc
  }, [])

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch =
      trainer.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.gymId.gymName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.gymId.location.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesExpertise =
      !filterByExpertise ||
      trainer.expertise.includes(filterByExpertise)

    return matchesSearch && matchesExpertise
  })

  return (
    <>
      <Helmet>
        <title>Find Your Perfect Fitness Trainer | GymLink</title>
        <meta name="description" content="Browse our comprehensive directory of certified fitness trainers from top gyms across the country. Find the perfect trainer to help you reach your fitness goals." />
        <meta name="keywords" content="fitness trainers, personal trainers, gym trainers, fitness experts, workout coach" />
      </Helmet>

      <div className='bg-black min-h-screen text-white font-stencil pb-12'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Fitness Trainer</h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">Browse our elite network of certified fitness professionals ready to help you achieve your goals</p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-gray-900 rounded-lg w-full py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="Search by trainer name, gym or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                className="bg-gray-900 rounded-lg py-3 px-4 w-full text-white focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer"
                value={filterByExpertise || ''}
                onChange={(e) => setFilterByExpertise(e.target.value || null)}
              >
                <option value="">All Specializations</option>
                {allExpertise.map((expertise, index) => (
                  <option key={index} value={expertise}>{expertise}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Trainers List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl">Loading trainers...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-500 text-xl">{error}</div>
            </div>
          ) : filteredTrainers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl">No trainers found matching your criteria.</h3>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterByExpertise(null)
                }}
                className="mt-4 bg-lime-400 hover:bg-lime-500 px-4 py-2 rounded-md transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrainers.map((trainer, index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={trainer.trainerImage || "/api/placeholder/400/320"}
                      alt={trainer.trainerName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="text-lime-500 mr-2" />
                        <span className="text-sm truncate">{trainer.gymId.location.city}, {trainer.gymId.location.state}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold">{trainer.trainerName}</h2>
                      <div className="bg-lime-500 text-black text-xs font-bold py-1 px-2 rounded-full">
                        {trainer.experience}+ YRS
                      </div>
                    </div>

                    <p className="text-lime-500 mb-4 text-sm">{trainer.gymId.gymName}</p>

                    <p className="text-gray-300 mb-4 line-clamp-2">{trainer.description}</p>

                    <div className="mt-2 mb-4">
                      <h3 className="text-sm font-semibold mb-2 text-gray-400 uppercase tracking-wider">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {trainer.expertise.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-800 text-lime-400 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {trainer.expertise.length > 3 && (
                          <span className="text-xs text-gray-400 mt-1">+{trainer.expertise.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <Award size={18} className="mr-2 mt-1 text-lime-500" />
                      <span className="text-sm">{trainer.certifications}</span>
                    </div>

                    <div className="flex items-center">
                      <Phone size={18} className="mr-2 text-lime-500" />
                      <span>{trainer.contactNumber}</span>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <button className="flex-1 bg-lime-400 hover:bg-lime-500 text-white py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllTrainers