import { FilterOptions, FindGym } from "@/types";
import { gymsData } from "@/utils/FindGym";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindGymPresenter from "./FindGymPresenter";

const FindGymContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    location: '',
    priceRange: 'all',
    amenities: [],
    rating: 0,
    distance: 50
  });
  const [sortBy, setSortBy] = useState<string>('distance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoriteGyms, setFavoriteGyms] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();


  const filterOptions = {
    categories: ['All', 'Premium', 'Standard', 'Luxury', 'Specialized', 'Wellness', 'Budget'],
    priceRanges: [
      { value: 'all', label: 'All Prices' },
      { value: 'budget', label: 'Under ₹2,000' },
      { value: 'mid', label: '₹2,000 - ₹3,000' },
      { value: 'premium', label: 'Above ₹3,000' }
    ],
    amenities: [
      'Swimming Pool', 'Sauna', 'Personal Training', 'Group Classes', 
      'Parking', 'Spa', 'Steam Room', 'Yoga Studio', 'Nutrition Bar'
    ],
    sortOptions: [
      { value: 'distance', label: 'Distance' },
      { value: 'rating', label: 'Rating' },
      { value: 'price_low', label: 'Price: Low to High' },
      { value: 'price_high', label: 'Price: High to Low' },
      { value: 'name', label: 'Name' }
    ]
  };

  // Filter and sort gyms
  const filteredGyms = gymsData
    .filter(gym => {
      // Search query filter
      if (searchQuery && !gym.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !gym.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Price range filter
      if (selectedFilters.priceRange !== 'all') {
        const monthly = gym.pricing.monthly;
        if (selectedFilters.priceRange === 'budget' && monthly >= 2000) return false;
        if (selectedFilters.priceRange === 'mid' && (monthly < 2000 || monthly > 3000)) return false;
        if (selectedFilters.priceRange === 'premium' && monthly <= 3000) return false;
      }
      
      // Rating filter
      if (selectedFilters.rating > 0 && gym.rating < selectedFilters.rating) {
        return false;
      }
      
      // Distance filter
      if (gym.distance > selectedFilters.distance) {
        return false;
      }
      
      // Amenities filter
      if (selectedFilters.amenities.length > 0) {
        const hasAllAmenities = selectedFilters.amenities.every(amenity => 
          gym.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_low':
          return a.pricing.monthly - b.pricing.monthly;
        case 'price_high':
          return b.pricing.monthly - a.pricing.monthly;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'distance':
        default:
          return a.distance - b.distance;
      }
    });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleFavoriteToggle = (gymId: number) => {
    setFavoriteGyms(prev => 
      prev.includes(gymId) 
        ? prev.filter(id => id !== gymId)
        : [...prev, gymId]
    );
  };

  const handleGymSelect = (gymId: number) => {
    navigate(`/gym/${gymId}`);
  };

  const handleGetDirections = (gym: FindGym) => {
    const address = encodeURIComponent(`${gym.address}, ${gym.city}, ${gym.state}`);
    window.open(`https://maps.google.com/?q=${address}`, '_blank');
  };

  const handleCallGym = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <FindGymPresenter
      gyms={filteredGyms}
      searchQuery={searchQuery}
      selectedFilters={selectedFilters}
      sortBy={sortBy}
      viewMode={viewMode}
      favoriteGyms={favoriteGyms}
      filterOptions={filterOptions}
      isLoading={isLoading}
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      onSortChange={handleSortChange}
      onViewModeChange={handleViewModeChange}
      onFavoriteToggle={handleFavoriteToggle}
      onGymSelect={handleGymSelect}
      onGetDirections={handleGetDirections}
      onCallGym={handleCallGym}
    />
  );
};
export default FindGymContainer;