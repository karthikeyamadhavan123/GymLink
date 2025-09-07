import type { FitnessTipProps } from '@/types';
import { Clock, Droplets, Dumbbell, Heart, Moon, Target, TrendingUp, Utensils } from 'lucide-react';
export const fitnessTips: FitnessTipProps[] = [
    {
        id: 1,
        category: 'workout',
        title: 'Strength Training',
        description: 'Build muscle and increase metabolic rate',
        icon: Dumbbell,
        tips: [
            'Start with compound exercises like squats and deadlifts',
            'Progressive overload is key to muscle growth',
            'Allow 48-72 hours rest between training same muscle groups',
            'Focus on proper form over heavy weights'
        ],
        color: 'text-red-400',
        bgGradient: 'from-red-500/20 to-pink-500/20'
    },
    {
        id: 2,
        category: 'cardio',
        title: 'Cardiovascular Health',
        description: 'Improve heart health and endurance',
        icon: Heart,
        tips: [
            'Aim for 150 minutes of moderate cardio per week',
            'Include both steady-state and interval training',
            'Start slowly and gradually increase intensity',
            'Mix different activities to prevent boredom'
        ],
        color: 'text-pink-400',
        bgGradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
        id: 3,
        category: 'routine',
        title: 'Workout Timing',
        description: 'Optimize your exercise schedule',
        icon: Clock,
        tips: [
            'Consistency matters more than perfect timing',
            'Morning workouts can boost metabolism all day',
            'Pre-workout meal should be 1-3 hours before',
            'Listen to your body\'s natural energy cycles'
        ],
        color: 'text-blue-400',
        bgGradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
        id: 4,
        category: 'nutrition',
        title: 'Nutrition Basics',
        description: 'Fuel your body for optimal performance',
        icon: Utensils,
        tips: [
            'Eat protein with every meal for muscle recovery',
            'Stay hydrated throughout the day',
            'Include complex carbs for sustained energy',
            'Don\'t skip meals, especially breakfast'
        ],
        color: 'text-green-400',
        bgGradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
        id: 5,
        category: 'hydration',
        title: 'Hydration Strategy',
        description: 'Maintain optimal fluid balance',
        icon: Droplets,
        tips: [
            'Drink water before you feel thirsty',
            'Aim for 8-10 glasses of water daily',
            'Increase intake during intense workouts',
            'Monitor urine color as hydration indicator'
        ],
        color: 'text-cyan-400',
        bgGradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
        id: 6,
        category: 'recovery',
        title: 'Rest & Recovery',
        description: 'Allow your body to rebuild and strengthen',
        icon: Moon,
        tips: [
            'Aim for 7-9 hours of quality sleep',
            'Include rest days in your routine',
            'Try active recovery like light walking',
            'Consider stretching or yoga for flexibility'
        ],
        color: 'text-purple-400',
        bgGradient: 'from-purple-500/20 to-indigo-500/20'
    },
    {
        id: 7,
        category: 'goals',
        title: 'Goal Setting',
        description: 'Create achievable and measurable objectives',
        icon: Target,
        tips: [
            'Set SMART goals (Specific, Measurable, Achievable)',
            'Break large goals into smaller milestones',
            'Track your progress regularly',
            'Celebrate small victories along the way'
        ],
        color: 'text-orange-400',
        bgGradient: 'from-orange-500/20 to-yellow-500/20'
    },
    {
        id: 8,
        category: 'progress',
        title: 'Track Progress',
        description: 'Monitor improvements and stay motivated',
        icon: TrendingUp,
        tips: [
            'Take progress photos and measurements',
            'Keep a workout log or use fitness apps',
            'Focus on how you feel, not just the scale',
            'Adjust your plan based on results'
        ],
        color: 'text-teal-400',
        bgGradient: 'from-teal-500/20 to-green-500/20'
    }
];
