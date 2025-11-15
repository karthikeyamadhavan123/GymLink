import { updatedWorkoutPlan } from '@/utils/data'
import { useEffect, useState } from 'react'
import TrackColumn from './components/TrackColumn'
// Export the interface here so it's globally available if needed,
// but for the sake of this file, the import is fine.
export interface TrackingProps {
    id: number
    task: string
    sets: number
    reps: number
    focus: string
    status: string
}

const Tracking = () => {
    const [trackingData, setTrackingData] = useState<TrackingProps[]>([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchTrackingDetails = async () => {
            try {
                setLoading(true)
                // Assuming updatedWorkoutPlan is an array of TrackingProps
                setTrackingData(updatedWorkoutPlan as TrackingProps[])
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchTrackingDetails()
    }, [])

    if (loading) {
        // Optional: Add a loading state screen
        return <div className="text-[#8fe60f] bg-black min-h-screen p-8 text-center text-2xl">Loading Workout...</div>;
    }

    return (
        // 1. Set the main container to black background (bg-black)
        // 2. Set the default text color to neon green (text-[#8fe60f])
        // 3. Ensure it takes up the full screen height (min-h-screen)
        <div className='font-stencil bg-black text-[#8fe60f] min-h-screen p-8'>
            <h1 className='text-4xl text-center mb-12 uppercase border-b-2 border-[#8fe60f] pb-4'>
                Workout Progress Tracker
            </h1>

            <div className='flex justify-center items-start gap-12'>
                {/* The TrackColumn component will inherit the text color */}
                <TrackColumn div_id='todo' data={trackingData} setTrackData={setTrackingData} />
                <TrackColumn div_id='doing' data={trackingData} setTrackData={setTrackingData} />
                <TrackColumn div_id='completed' data={trackingData} setTrackData={setTrackingData} />
            </div>

        </div>
    )
}

export default Tracking