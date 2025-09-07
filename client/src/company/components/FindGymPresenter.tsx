import { FindGymPresenterProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Star,
  Heart,
  Phone,
  Clock,
  Grid3X3,
  List,
  Navigation,
  Dumbbell,
  Users,
  Car,
  Waves,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';






const FindGymPresenter = ({
  gyms,
  searchQuery,
  selectedFilters,
  sortBy,
  viewMode,
  favoriteGyms,
  filterOptions,
  isLoading,
  onSearch,
  onFilterChange,
  onSortChange,
  onViewModeChange,
  onFavoriteToggle,
  onGymSelect,
  onGetDirections,
  onCallGym
}: FindGymPresenterProps) => {

  const getAmenityIcon = (amenity: string) => {
    const icons = {
      'Swimming Pool': Waves,
      'Personal Training': Users,
      'Parking': Car,
      'Group Classes': Users,
      'Sauna': Zap,
      'Spa': Award,
      'Steam Room': Zap,
      'Yoga Studio': TrendingUp,
      'Nutrition Bar': Award
    };
    return icons[amenity as keyof typeof icons] || Dumbbell;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 font-stencil">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-black py-20"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            className="inline-flex p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 mb-6"
          >
            <MapPin className="w-12 h-12 text-blue-400" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-lime-400  mb-6">
            Find Your Perfect Gym
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the best fitness centers near you. Compare prices, amenities, and reviews to find your ideal workout destination.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gyms, locations, or amenities..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8"
        >
          {/* Filter Button */}
          {/* Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Price Range */}
            <select
              value={selectedFilters.priceRange}
              onChange={(e) => onFilterChange({ ...selectedFilters, priceRange: e.target.value })}
              className="bg-gray-800/50 border border-gray-600/50 text-gray-300 px-4 py-2 rounded-xl"
            >
              {filterOptions.priceRanges.map((range:any) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Rating */}
            <select
              value={selectedFilters.rating}
              onChange={(e) => onFilterChange({ ...selectedFilters, rating: Number(e.target.value) })}
              className="bg-gray-800/50 border border-gray-600/50 text-gray-300 px-4 py-2 rounded-xl"
            >
              <option value={0}>All Ratings</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={5}>5 Stars</option>
            </select>

            {/* Distance */}
            <select
              value={selectedFilters.distance}
              onChange={(e) => onFilterChange({ ...selectedFilters, distance: Number(e.target.value) })}
              className="bg-gray-800/50 border border-gray-600/50 text-gray-300 px-4 py-2 rounded-xl"
            >
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={20}>Within 20 km</option>
              <option value={50}>Within 50 km</option>
            </select>
          </div>


          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-gray-800/50 border border-gray-600/50 text-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500/50"
            >
              {filterOptions.sortOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>

            <div className="flex items-center bg-gray-800/50 border border-gray-600/50 rounded-xl p-1">
              <motion.button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-300'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Grid3X3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-300'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Gyms Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {gyms.map((gym) => (
              <motion.div
                key={gym.id}
                variants={itemVariants}
                className={`group relative cursor-pointer bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                  }`}
                onClick={() => onGymSelect(gym.id)}
                whileHover={{ scale: 1.02 }}
                layout={false}
              >
                {/* Featured Badge */}
                {gym.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                )}

                {/* Favorite Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle(gym.id);
                  }}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-5 h-5 ${favoriteGyms.includes(gym.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-300'
                      }`}
                  />
                </motion.button>

                {/* Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'} overflow-hidden`}>
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Status Badge */}
                  <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${gym.isOpen
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                    {gym.isOpen ? 'Open Now' : 'Closed'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {gym.name}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{gym.distance} km away</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-medium">{gym.rating}</span>
                      <span className="text-gray-400 text-sm">({gym.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">
                    {gym.address}, {gym.city}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {gym.amenities.slice(0, 3).map((amenity, index) => {
                      const IconComponent = getAmenityIcon(amenity);
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-1 bg-gray-700/50 px-2 py-1 rounded-lg text-xs text-gray-300"
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                    {gym.amenities.length > 3 && (
                      <div className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-lg text-xs">
                        +{gym.amenities.length - 3} more
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-400">
                        ₹{gym.pricing.monthly.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-sm">per month</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-400">
                        Save ₹{((gym.pricing.monthly * 12) - gym.pricing.yearly).toLocaleString()}
                      </div>
                      <div className="text-blue-400 text-sm font-medium">
                        with yearly plan
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGetDirections(gym);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Directions</span>
                    </motion.button>

                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCallGym(gym.phone);
                      }}
                      className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Phone className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center space-x-2 mt-3 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{gym.openHours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {gyms.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 max-w-md mx-auto">
              <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Gyms Found</h3>
              <p className="text-gray-400">
                Try adjusting your search criteria or expanding your search radius.
              </p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FindGymPresenter;