import { Zap, Heart, Star, Sparkles } from 'lucide-react';
import type { QuestionBase } from "@/types"



export const faqData: QuestionBase[] = [
  {
    id: 1,
    question: "What is GymLink and how does it work?",
    answer: "GymLink is a dynamic web platform that bridges the gap between fitness seekers and gym service providers. Whether you're looking for a gym nearby, want to compare facilities, or book sessions with professional trainers, GymLink simplifies the process with a modern and intuitive interface.",
    icon: Zap
  },
  {
    id: 2,
    question: "How do I find gyms or trainers near me?",
    answer: "Simply enter your location on our platform, and GymLink will show you a curated list of gyms and trainers in your area. You can filter by distance, price, ratings, and specific services like personal training, yoga, or weightlifting.",
    icon: Heart
  },
  {
    id: 3,
    question: "Is there a cost to use GymLink?",
    answer: "Creating an account and browsing gyms/trainers is completely free. You only pay when you book a session or sign up for a membership through our platform. We offer transparent pricing with no hidden fees.",
    icon: Star
  },
  {
    id: 4,
    question: "How do I book a training session?",
    answer: "Once you find a trainer or gym you like, simply select your preferred date and time, provide your payment information, and confirm your booking. You'll receive a confirmation email with all the details.",
    icon: Sparkles
  },
  {
    id: 5,
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule sessions through your account dashboard. Please note that cancellation policies may vary by gym or trainer, so check their specific terms before booking.",
    icon: Zap
  },
  {
    id: 6,
    question: "How are trainers and gyms vetted on GymLink?",
    answer: "We verify all trainers' certifications and gyms' business licenses before they can join our platform. Additionally, we monitor user reviews and ratings to maintain quality standards.",
    icon: Heart
  },
  {
    id: 7,
    question: "What payment methods are accepted?",
    answer: "GymLink accepts all major credit cards, debit cards, and PayPal. We use industry-standard encryption to ensure your payment information is secure.",
    icon: Star
  },
  {
    id: 8,
    question: "I'm a gym owner/trainer. How can I join GymLink?",
    answer: "We'd love to have you! Click on the 'For Providers' link in the footer to create a business account. You'll need to provide some documentation for verification, and then you can set up your profile.",
    icon: Sparkles
  }
];