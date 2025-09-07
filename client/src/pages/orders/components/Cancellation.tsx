export default function CancellationRefund() {
  return (
    <div className="min-h-screen bg-black text-lime-400 p-4 sm:p-6 lg:p-8 font-stencil">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 
  bg-gradient-to-r from-white via-lime-400 to-white 
  bg-clip-text text-transparent animate-pulse">
            Cancellation & Refund Policy
          </h1>

          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-lime-400 to-lime-300 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Introduction */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-lime-400/20 rounded-xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/20">
            <p className="text-lg sm:text-xl leading-relaxed text-lime-300">
              We aim to provide a hassle-free experience. Below are our cancellation and refund rules:
            </p>
          </div>

          {/* Policy Items */}
          <div className="grid gap-4 sm:gap-6">
            {[
              {
                title: "Membership Cancellation",
                description: "Memberships can be cancelled within 7 days of purchase.",
                icon: "📅"
              },
              {
                title: "Refund Processing",
                description: "Refunds are processed within 5–7 business days.",
                icon: "💳"
              },
              {
                title: "Training Plan Policy",
                description: "Training plans are non-refundable after the first session.",
                icon: "🏋️"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-900/30 border border-lime-400/30 rounded-lg p-4 sm:p-6 hover:bg-gray-800/50 transition-all duration-300 hover:border-lime-400/60 group transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-lime-400 mb-2 group-hover:text-lime-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-100/90 leading-relaxed">
                      {item.description}
                    </p>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 border border-lime-400/40 rounded-xl p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/30">
            <h3 className="text-xl sm:text-2xl font-semibold text-lime-400 mb-4">
              Need Assistance?
            </h3>
            <p className="text-lime-300/90 mb-4 text-sm sm:text-base">
              Our support team is here to help with any questions or concerns.
            </p>
            <a
              href="mailto:support@gylmlink.com"
              className="inline-flex items-center space-x-2 
  bg-gradient-to-r from-lime-400 to-white 
  text-black px-6 py-3 rounded-lg font-semibold 
  hover:from-white hover:to-lime-300 
  transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/40 
  transform hover:-translate-y-1"
            >
              <span>📧</span>
              <span>support@gylmlink.com</span>
            </a>

          </div>
        </div>

        {/* Footer Accent */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-lime-400/60 text-sm">
            <div className="w-8 h-px bg-lime-400/40"></div>
            <span>GymLink Policies</span>
            <div className="w-8 h-px bg-lime-400/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}