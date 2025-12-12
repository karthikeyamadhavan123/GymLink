import { updatedWorkoutPlan } from '@/utils/data'
import { useEffect, useState } from 'react'
import TrackColumn from './components/TrackColumn'
import Loading from '@/utils/Loading'
import { TrackingProps } from './types/types'



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
        <Loading />
    }

    return (
        <div className="font-stencil bg-black text-[#8fe60f] min-h-screen px-6 py-10">
            <h1 className="text-4xl text-center mb-12 uppercase border-b-2 border-[#8fe60f] pb-4 tracking-wider">
                Workout Progress Tracker
            </h1>

            <div className="flex justify-center items-start gap-8 md:gap-12 flex-wrap">
                <TrackColumn div_id="todo" data={trackingData} setTrackData={setTrackingData} />
                <TrackColumn div_id="doing" data={trackingData} setTrackData={setTrackingData} />
                <TrackColumn div_id="completed" data={trackingData} setTrackData={setTrackingData} />
            </div>
        </div>

    )
}

export default Tracking