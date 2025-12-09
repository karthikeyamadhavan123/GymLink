import React from "react"
import { IconType } from "react-icons/lib"


export interface QuestionBase {
  id: number,
  question: string,
  answer: string,
  icon: IconType
}

export interface FrequentlyAskedQuestionPresenterProps extends QuestionBase {
  isOpen: boolean,
  toggleOpen: (id: number) => void
}

export interface FitnessTipProps {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: IconType;
  tips: string[];
  color: string;
  bgGradient: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface FitnessTipPropsPresenter {
  categories: Category[]
  selectedCategory: string,
  filteredTips: FitnessTipProps[]
  hoveredTip: number | null
  onCategoryChange: (categoryId: string) => void;
  onHoverStart: (tipId: number) => void;
  onHoverEnd: () => void;
  onGetStarted: () => void;

}

export interface TermsSection {
  id: string;
  title: string;
  content: string[];
  icon: string;
  color: string;
}

export interface TermsConditionsPresenterProps {
  termsData: TermsSection[];
  activeSection: string;
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
  onBackToTop: () => void;
  onGoBack: () => void;
  onContactSupport: () => void;
}


export interface FindGym {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  pricing: {
    monthly: number;
    yearly: number;
  };
  distance: number;
  isOpen: boolean;
  openHours: string;
  phone: string;
  category: string;
  featured: boolean;
}

export interface FilterOptions {
  location: string;
  priceRange: string;
  amenities: string[];
  rating: number;
  distance: number;
}

export interface FindGymPresenterProps {
  gyms: FindGym[];
  searchQuery: string;
  selectedFilters: FilterOptions;
  sortBy: string;
  viewMode: 'grid' | 'list';
  favoriteGyms: number[];
  filterOptions: any;
  isLoading: boolean;
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onFavoriteToggle: (gymId: number) => void;
  onGymSelect: (gymId: number) => void;
  onGetDirections: (gym: FindGym) => void;
  onCallGym: (phone: string) => void;
}

export interface TermsSection {
  id: string;
  title: string;
  content: string[];
  icon: string;
  color: string;
}

export interface TermsConditionsPresenterProps {
  termsData: TermsSection[];
  activeSection: string;
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
  onBackToTop: () => void;
  onGoBack: () => void;
  onContactSupport: () => void;
}


export interface Trainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  students: number;
  image: string;
  achievement: string;
  growth: string;
}

export interface TopTrainerPresenterProps {
  trainers: Trainer[];
  activeTrainer: number;
  setActiveTrainer: (index: number) => void;
}

export interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}


export interface InputProps {
  type: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number,
  placeholder?: string
  required?: boolean
  name: string
  id?: string
  accept?: string
  min?: number
  max?: number;
  className?: string
}

export interface FormProps {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone_number: string,
  location: string,
  age: string,
  gender: string,
  avatar: File | null,
  role: string
}

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset',
  handleClick?: () => void
  text?: string | React.ReactNode
  className: string
  disabled?: boolean
}

export interface SelectProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string | number,
  required?: boolean
  name: string
  data?: any[]
  id: string
  className?: string
}




export interface LabelProps {
  htmlFor: string
  labelText: string
}



export interface FormSubmitProps {
  handleSubmit: (e: React.FormEvent) => void;
  bodyContent?: React.ReactNode
  children: React.ReactElement
}


export interface ProtectedProps {
  Component: React.ReactNode
}

