// Fixed Container Component
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fitnessTips } from '@/utils/FitnessTips';
import FitnessTipsPresenter from './FitnessTipsPresenter'; 

const FitnessTipsContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTip, setHoveredTip] = useState<number | null>(null);
  const navigator = useNavigate();

  // Fix 1: Reset scroll position on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const categories = [
    { id: 'all', name: 'All Tips', icon: 'Star' },
    { id: 'workout', name: 'Workout', icon: 'Dumbbell' },
    { id: 'cardio', name: 'Cardio', icon: 'Heart' },
    { id: 'nutrition', name: 'Nutrition', icon: 'Utensils' },
    { id: 'recovery', name: 'Recovery', icon: 'Moon' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? fitnessTips 
    : fitnessTips.filter(tip => tip.category === selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleHoverStart = (tipId: number) => {
    setHoveredTip(tipId);
  };

  const handleHoverEnd = () => {
    setHoveredTip(null);
  };

  const handleGetStarted = () => {
    navigator('/api/auth/register');
  };

  return (
    <FitnessTipsPresenter
      categories={categories}
      selectedCategory={selectedCategory}
      filteredTips={filteredTips}
      hoveredTip={hoveredTip}
      onCategoryChange={handleCategoryChange}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onGetStarted={handleGetStarted}
    />
  );
};

export default FitnessTipsContainer;