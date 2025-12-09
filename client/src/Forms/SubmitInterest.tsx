import { useState } from 'react'
import useIntrests from '@/hooks/useIntersets'
import Loading from '@/utils/Loading'
import ErrorMessage from '@/utils/Error'
import { X } from 'lucide-react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { HashLoader } from 'react-spinners'

const SubmitInterest = () => {
    const URI = "/api/users/intrests"
    const { loading, error, interests } = useIntrests(URI)
    const location = useLocation();
    const userId = location.state;
    const router = useNavigate();
    const [intrestVal, setintrestVal] = useState<string[]>([])
    const [singleVal, setsingleVal] = useState("")
    const [intrestLoading, setintrestLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setsingleVal(e.target.value)
        if (!intrestVal.includes(e.target.value)) {
            setintrestVal((prev) => [...prev, e.target.value])
        }
        setsingleVal("")
    }

    const handleDelete = (idx: number) => {
        setintrestVal(intrestVal.filter((_i, index) => index !== idx))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setintrestLoading(true)

            const res = await axios.post("http://localhost:8080/api/users/submit-intrests", {
                intrtests: intrestVal,
                userId: userId
            })

            if (res.status === 200) {
                toast.success("Interests added successfully!🔥")
                setintrestVal([])
                router('/api/auth/login')
            }
        } catch (error) {
            console.log(error)
            toast.error("Error submitting interests")
        } finally {
            setintrestLoading(false)
        }
    }

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error} />

    return (
        <form
            className="min-h-screen bg-black flex items-center justify-center px-4 py-12 font-stencil"
            onSubmit={handleSubmit}
        >
            <div className="w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 
                            rounded-3xl p-8 shadow-[0_0_30px_rgba(0,255,100,0.18)]
                            transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center leading-relaxed 
                               drop-shadow-[0_0_12px_rgba(0,255,100,0.45)]">
                    💪 Hey <span className="text-lime-400">GymFreak</span>!
                    <br />
                    Choose Your <span className="text-lime-400">Top 3 Interests</span>
                </h3>

                <p className="text-center text-lime-300/80 mb-6 text-sm md:text-base">
                    Pick <span className="text-lime-400 font-semibold">exactly 3</span> to build your profile.
                </p>
                <div className="flex flex-wrap gap-3 mb-6 justify-center">
                    {intrestVal.map((intrest, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1 text-sm text-lime-300 border border-lime-500/40 
                                       rounded-full bg-lime-500/10 hover:bg-lime-500/20 transition-all duration-200 
                                       shadow-[0_0_12px_rgba(0,255,100,0.15)]"
                        >
                            <span>#{intrest}</span>

                            <button
                                type="button"
                                onClick={() => handleDelete(index)}
                                className="text-lime-400 hover:text-red-400 transition duration-150"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
                <select
                    value={singleVal}
                    onChange={handleChange}
                    disabled={intrestVal.length === 3}
                    className={`
                        w-full px-4 py-3 bg-white/10 text-white border rounded-xl outline-none 
                        transition-all duration-200 focus:ring-2 focus:ring-lime-400 
                        ${intrestVal.length === 3
                            ? "border-red-400/40 opacity-50 cursor-not-allowed"
                            : "border-white/20 hover:border-lime-400/50"
                        }
                    `}
                >
                    <option value="" disabled className="text-gray-400">Select one Interest</option>

                    {interests.map((intrest, index) => (
                        <option key={index} value={intrest} className="text-black">
                            {intrest}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    disabled={intrestLoading}
                    className={`
                        w-full mt-6 py-3 rounded-xl font-semibold tracking-wide shadow-md
                        transition-all duration-200 active:scale-95 
                        ${intrestVal.length !== 3
                            ? "bg-gray-600 cursor-not-allowed text-gray-300"
                            : "bg-lime-400 text-black hover:bg-lime-300"
                        }
                    `}
                >
                    {intrestLoading
                        ? <div className="flex justify-center"><HashLoader size={20} color="#000" /></div>
                        : "Submit Interests"}
                </button>

            </div>
        </form>
    )
}

export default SubmitInterest






