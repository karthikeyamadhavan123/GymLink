const Header = () => {
    return (
        <div className="font-nunito flex flex-col gap-6">
            <h1 className="text-center font-bold text-white text-4xl">Welcome to <span className="font-bold text-[#88E70B]">GymLink</span> – Your Ultimate Fitness Companion</h1>
            <p className="text-white text-center text-xl px-24">Find the best gyms, top trainers, and exciting job opportunities in the fitness industry—all in one place. Whether you're looking to train, hire, or grow your gym business, GymLink connects you with the right people. Discover AI-powered recommendations, real-time chat with gym owners and trainers, and seamless job applications. Take the next step in your fitness journey today!</p>
            <div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-9">
                    <div className="flex border-dashed border-2 justify-center items-center border-white">
                        <img src="/login.png" alt="login" className="w-6 h-6" />
                        <button className="text-white font-bold group-hover:text-gray-300 transition-colors duration-200 cursor-pointer p-4">
                            Enter Arena
                        </button>
                    </div>
                    <div className="flex border-dashed border-2 p-4 border-white items-center justify-center gap-3">
                        <img src="/biceps1.png" alt="sign up" className="w-6 h-6" />
                        <button className="rounded font-bold cursor-pointer text-[#88E70B]">
                            Join the Arena
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header