// TopTrainerPresenter.tsx
import { TopTrainerPresenterProps } from '@/types';
import { Users, Award, TrendingUp, Star, ChevronRight, PlayCircle } from 'lucide-react';

const TopTrainerPresenter = ({
    trainers,
    activeTrainer,
    setActiveTrainer
}: TopTrainerPresenterProps) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-2">
            {/* Featured Trainer Card */}
            <div className="mb-6 md:mb-12">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-lime-300 mb-4 md:mb-6 lg:mb-8 text-center px-2">Featured Trainer</h2>
                <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-md rounded-xl md:rounded-2xl lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8 border border-gray-600/30 shadow-xl md:shadow-2xl">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                        <div className="relative w-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-lime-300/20 to-emerald-400/20 rounded-lg md:rounded-xl lg:rounded-2xl blur-xl"></div>
                            <img
                                src={trainers[activeTrainer].image}
                                alt={trainers[activeTrainer].name}
                                className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 bg-lime-300/90 text-gray-900 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                                {trainers[activeTrainer].growth}
                            </div>
                        </div>

                        <div className="space-y-3 md:space-y-4 lg:space-y-6 w-full">
                            <div className="text-center lg:text-left">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                                    {trainers[activeTrainer].name}
                                </h3>
                                <p className="text-base md:text-lg lg:text-xl text-lime-300 font-semibold">
                                    {trainers[activeTrainer].specialty}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 md:gap-3 lg:gap-4">
                                <div className="flex items-center gap-1 md:gap-2 bg-gray-700/50 px-3 py-1 md:px-4 md:py-2 rounded-full">
                                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                                    <span className="text-white text-sm md:text-base font-semibold">{trainers[activeTrainer].rating}</span>
                                </div>
                                <div className="flex items-center gap-1 md:gap-2 bg-gray-700/50 px-3 py-1 md:px-4 md:py-2 rounded-full">
                                    <Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                                    <span className="text-white text-sm md:text-base">{trainers[activeTrainer].students.toLocaleString()} students</span>
                                </div>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <div className="bg-lime-300/10 text-lime-300 px-3 py-1 md:px-4 md:py-2 rounded-full border border-lime-300/30 text-sm md:text-base inline-flex items-center">
                                    <Award className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                                    {trainers[activeTrainer].achievement}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 pt-2 md:pt-4">
                                <button className="bg-lime-300 hover:bg-lime-400 text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200 text-sm md:text-base w-full sm:w-auto">
                                    <PlayCircle className="w-4 h-4 md:w-5 md:h-5" />
                                    Watch Introduction
                                </button>
                                <button className="border border-lime-300 text-lime-300 hover:bg-lime-300 hover:text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 text-sm md:text-base w-full sm:w-auto">
                                    View Profile
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trainer Selection */}
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-lime-300 mb-4 md:mb-6 lg:mb-8 text-center px-2">All Top Trainers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                    {trainers.map((trainer, index) => (
                        <div
                            key={trainer.id}
                            onClick={() => setActiveTrainer(index)}
                            className={`cursor-pointer bg-gray-800/40 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 border transition-all duration-300 hover:scale-105 ${activeTrainer === index
                                    ? 'border-lime-300 bg-gray-700/60 shadow-lg shadow-lime-300/20'
                                    : 'border-gray-700/50 hover:border-gray-600/70'
                                }`}
                        >
                            <div className="relative mb-3">
                                <img
                                    src={trainer.image}
                                    alt={trainer.name}
                                    className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover rounded-md md:rounded-lg lg:rounded-xl"
                                />
                                <div className="absolute top-2 right-2 bg-gray-900/80 text-lime-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    {trainer.rating}
                                </div>
                            </div>

                            <h3 className="text-sm md:text-base lg:text-lg font-bold text-white mb-1 md:mb-2 text-center">{trainer.name}</h3>
                            <p className="text-lime-300 font-medium mb-2 md:mb-3 text-xs md:text-sm lg:text-base text-center">{trainer.specialty}</p>

                            <div className="flex items-center justify-between text-xs md:text-sm">
                                <span className="text-gray-400 truncate">{trainer.students.toLocaleString()} students</span>
                                <div className="flex items-center gap-1 text-emerald-400">
                                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                                    {trainer.growth}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopTrainerPresenter;