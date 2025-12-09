
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 py-10 font-stencil text-white bg-black">
      <HashLoader size={50} />
      <p className="text-center text-sm opacity-80 animate-pulse font-stencil text-lime-400">
        Thanks for waiting. Loading you with best results...
      </p>
    </div>
  );
};

export default Loading;