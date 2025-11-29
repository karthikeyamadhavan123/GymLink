import React, { useState } from "react"
import { TrackingProps } from "../Tracking";

interface TrackingColumnProps {
    div_id: 'todo' | 'doing' | 'completed';
    data: TrackingProps[]
    setTrackData: React.Dispatch<React.SetStateAction<TrackingProps[]>>
}

const TrackColumn: React.FC<TrackingColumnProps> = ({ div_id, data, setTrackData }) => {

    const [trackingId, setTrackingId] = useState(-1);
    const [startPoints, setSearchPoints] = useState({
        pageX: 0,
        pageY: 0
    })

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: number) => {
        e.dataTransfer.setData('text/plain', id.toString());
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const draggedTaskId = parseInt(e.dataTransfer.getData('text/plain'));
        const newStatus = e.currentTarget.id;

        const updatedTaskList = data.map((task) => {
            if (task.id === draggedTaskId) {
                return { ...task, status: newStatus }
            }
            return task;
        })

        setTrackData(updatedTaskList)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLLIElement>, task_id: number) => {
        e.stopPropagation();
        setTrackingId(task_id);

        setSearchPoints({
            pageX: e.clientX,
            pageY: e.clientY
        });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        let updatedTaskList;
        const startX = startPoints.pageX
        const endX = e.clientX

        const dist = startX - endX;
        console.log(dist);

        if (dist > 451.89) {
            updatedTaskList = data.map((task) =>
                task.id === trackingId ? { ...task, status: 'todo' } : task
            );
            setTrackData(updatedTaskList);

        } else if (dist > 237.21 && dist <= 451.89) {
            updatedTaskList = data.map((task) =>
                task.id === trackingId ? { ...task, status: 'doing' } : task
            );
            setTrackData(updatedTaskList);

        } else if (dist > 195.23 && dist <= 237.21) {
            updatedTaskList = data.map((task) =>
                task.id === trackingId ? { ...task, status: 'todo' } : task
            );
            setTrackData(updatedTaskList);

        } else if (dist < -451.89) {
            updatedTaskList = data.map((task) =>
                task.id === trackingId ? { ...task, status: 'completed' } : task
            );
            setTrackData(updatedTaskList);

        } else if (dist < -237.21 && dist >= -451.89) {
            updatedTaskList = data.map((task) =>
                task.id === trackingId ? { ...task, status: 'completed' } : task
            );
            setTrackData(updatedTaskList);

        } else if (dist < -195.23 && dist >= -237.21) {
            updatedTaskList = data.map((task) =>
                task.id === trackingId ? { ...task, status: 'doing' } : task
            );
            setTrackData(updatedTaskList);

        } else {
            throw new Error(`mismatch in calculation ${dist}`);
        }
    };

    return (
        <div
            className="bg-gray-900 w-64 h-96 text-center p-4 rounded-lg border-2 border-[#8fe60f]"
            id={div_id}
            onDragOver={handleDragOver}
            onDrop={handleDrop}

            /* POINTER UP EVENT */
            onPointerUp={handlePointerUp}
        >
            <h3 className="uppercase font-bold text-lg mb-4 border-b border-[#8fe60f] pb-2">
                Status: {div_id}
            </h3>

            <ul className="space-y-2 overflow-y-auto max-h-[80%]">
                {
                    data.map((t_data) =>
                        t_data.status === div_id ? (
                            <li
                                key={t_data.id}
                                className="
                                    list-none bg-gray-800 p-2 rounded-md shadow-md text-white text-sm
                                    cursor-grab active:cursor-grabbing select-none touch-none
                                    border border-transparent hover:border-[#8fe60f] transition-all duration-200
                                "
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, t_data.id)}

                                /* POINTER DOWN EVENT */
                                onPointerDown={(e) => handlePointerDown(e, t_data.id)}
                            >
                                {t_data.task}
                            </li>
                        ) : null
                    )
                }
            </ul>
        </div>
    )
}

export default TrackColumn
