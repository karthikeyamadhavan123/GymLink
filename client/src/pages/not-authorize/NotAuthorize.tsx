import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="font-stencil bg-black flex items-center justify-center h-screen text-white flex-col space-y-7">
            <h1 className="lg:text-6xl md:text-3xl sm:text-xl xs:text-center">Sorry.The page you browsed is not accessible for you.</h1>
            <img src="/403.jpg" alt="page not authorize" className="lg:w-96 lg:h-96 md:w-96 md:h-96 sm:w-84 sm:h-84 bg-transparent xs:w-44 xs:h-44" />
            <Link to='/' className="lg:text-2xl cursor-pointer hover:underline hover:transition-all hover:ease-in-out hover:text-lime-300 md:text-xl sm:text-lg">Back to Home</Link>
        </div>
    )
}

export default NotFound
