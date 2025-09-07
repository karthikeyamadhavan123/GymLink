export default function TrackSubscription() {
  return (
    <div className="min-h-screen bg-black text-lime-400 p-6 sm:p-8 font-stencil">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 
            bg-gradient-to-r from-white via-lime-400 to-white 
            bg-clip-text text-transparent animate-pulse">
            Track Subscription
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-400 to-white mx-auto rounded-full"></div>
        </div>

        {/* Instructions */}
        <p className="text-gray-100/90 text-center mb-6 sm:text-lg">
          Enter your <span className="text-lime-300 font-semibold">Subscription ID</span> or 
          <span className="text-lime-300 font-semibold"> Registered Email</span> to view your 
          current plan, payment status, and renewal date.
        </p>

        {/* Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-lime-400/30 
          rounded-xl p-6 sm:p-8 shadow-lg shadow-lime-400/10">
          
          <input
            type="text"
            placeholder="Enter Subscription ID or Email"
            className="border border-lime-400/40 bg-black/60 text-white 
              rounded-lg p-3 w-full focus:outline-none focus:ring-2 
              focus:ring-lime-400 transition-all"
          />
          
          <button 
            className="mt-4 w-full px-4 py-3 
              bg-gradient-to-r from-lime-400 to-white 
              text-black font-semibold rounded-lg 
              hover:from-white hover:to-lime-300 
              transition-all duration-300 transform hover:-translate-y-1 
              hover:shadow-lg hover:shadow-lime-400/40"
          >
            🔍 Track
          </button>
        </div>

        {/* Footer Accent */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center space-x-2 text-lime-400/60 text-sm">
            <div className="w-8 h-px bg-lime-400/40"></div>
            <span>GymLink Subscriptions</span>
            <div className="w-8 h-px bg-lime-400/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
