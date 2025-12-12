export interface TrackingProps {
    id: number
    task: string
    sets: number
    reps: number
    focus: string
    status: string
}

export interface TrackingColumnProps {
    div_id: 'todo' | 'doing' | 'completed';
    data: TrackingProps[]
    setTrackData: React.Dispatch<React.SetStateAction<TrackingProps[]>>
}