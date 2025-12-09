import { Link } from "react-router-dom";

interface ErrorProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorProps) => {
    return (
        <div className="w-full bg-red-500/20 border border-red-500 text-red-300 px-4 py-4 rounded-xl mt-4 flex flex-col gap-3 font-stencil">
            <p>{message}</p>
            <Link
                to="/"
                className="inline-block w-fit px-4 py-2 bg-red-600/30 border border-red-400 text-red-200 rounded-lg hover:bg-red-600/50 transition"
            >
                ⬅ Back to Home
            </Link>
        </div>
    );
};

export default ErrorMessage;