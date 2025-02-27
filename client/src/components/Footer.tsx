import { FaInstagram, FaYoutube, FaPinterest, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white p-12 flex flex-col justify-center items-center h-[638px]">
      <div className="max-w-screen-xl w-full flex justify-between items-start gap-10 mt-10">
        {/* Get to Know Us Section */}
        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-extrabold font-nunito text-2xl tracking-[5px] underline">
            GET TO KNOW US
          </h1>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            FAQ&apos;s
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Fitness Tips
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Terms & conditions
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Find a Gym
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Top Trainers
          </a>
        </div>

        {/* Orders Section */}
        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-extrabold font-nunito text-2xl tracking-[5px] underline">
            ORDERS
          </h1>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Memberships
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Track Subscription
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Cancellation & Refund Policy
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Elite Training
          </a>
          <a href="#" className="font-semibold font-nunito text-xl hover:text-[#88E70B] hover:underline">
            Personal Training Plans
          </a>
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="w-full max-w-screen-xl flex flex-col justify-start items-start mt-10 text-start font-nunito gap-2">
        <h1 className="text-xl font-semibold">
          SIGN UP AND <span className="text-[#88E70B] font-extrabold">TRAIN</span>
        </h1>
        <p className="text-lg">
          Sign up now to find top gyms, expert trainers & exclusive fitness deals—only on{" "}
          <span className="text-[#88E70B]">GymLink!</span>
        </p>
        <div className="relative w-1/3 ">
          <input
            type="text"
            className="text-white border-b-2 border-white bg-transparent outline-none mt-2 w-full max-w-md p-2"
            placeholder="Enter your email"
          />
          <img src="/mail1.png" alt="" className="absolute w-6 h-6 bottom-2 right-0" />
        </div>
        <div className="flex gap-6 mt-8 justify-between items-start">
          <a href="#" className="text-white hover:text-[#88E70B]">
            <FaInstagram size={30} />
          </a>
          <a href="#" className="text-white hover:text-[#88E70B]">
            <FaYoutube size={30} />
          </a>
          <a href="#" className="text-white hover:text-[#88E70B]">
            <FaPinterest size={30} />
          </a>
          <a href="#" className="text-white hover:text-[#88E70B]">
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-white flex flex-col justify-center items-center mt-5 w-full">
        <span>&copy;2025 GYMLINK</span>
        <span className="text-white font-medium">Made In India, for World</span>
      </div>
    </div>
  );
};

export default Footer;
