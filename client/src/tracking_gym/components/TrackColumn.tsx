import React, { useState, useRef, useEffect } from "react"
import { TrackingColumnProps } from "../types/types";

const TrackColumn: React.FC<TrackingColumnProps> = ({ div_id, data, setTrackData }) => {

    const [trackingId, setTrackingId] = useState(-1);
    const [startPoints, setSearchPoints] = useState({
        pageX: 0,
        pageY: 0
    })
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDropZone, setIsDropZone] = useState(false);
    const columnRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: number) => {
        e.dataTransfer.setData('text/plain', id.toString());
        e.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);
        setTrackingId(id);

        // Add ghost image effect
        const ghost = e.currentTarget.cloneNode(true) as HTMLElement;
        ghost.style.opacity = '0.5';
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
    }

    const handleDragEnd = () => {
        setIsDragging(false);
        setIsDropZone(false);
        setTrackingId(-1);
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

        setTrackData(updatedTaskList);
        setIsDropZone(false);
        setIsDragging(false);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDropZone(true);
    }

    const handleDragLeave = () => {
        setIsDropZone(false);
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLLIElement>, task_id: number) => {
        e.stopPropagation();
        setTrackingId(task_id);
        setIsDragging(true);

        setSearchPoints({
            pageX: e.clientX,
            pageY: e.clientY
        });
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (trackingId === -1 || !isDragging) return;

        const offsetX = e.clientX - startPoints.pageX;
        const offsetY = e.clientY - startPoints.pageY;
        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (trackingId === -1) return;

        let updatedTaskList;
        const startX = startPoints.pageX
        const endX = e.clientX

        const dist = startX - endX;

        // More intuitive thresholds based on screen size
        const threshold = isMobile ? 80 : 150;

        if (Math.abs(dist) < 30) {
            // No significant drag, keep current status
            setIsDragging(false);
            setDragOffset({ x: 0, y: 0 });
            setTrackingId(-1);
            return;
        }

        // Simplified logic: swipe right = previous status, swipe left = next status
        if (dist > threshold) {
            // Swiped right - move backward in workflow
            updatedTaskList = data.map((task) => {
                if (task.id === trackingId) {
                    if (task.status === 'doing') return { ...task, status: 'todo' };
                    if (task.status === 'completed') return { ...task, status: 'doing' };
                }
                return task;
            });
        } else if (dist < -threshold) {
            // Swiped left - move forward in workflow
            updatedTaskList = data.map((task) => {
                if (task.id === trackingId) {
                    if (task.status === 'todo') return { ...task, status: 'doing' };
                    if (task.status === 'doing') return { ...task, status: 'completed' };
                }
                return task;
            });
        }

        if (updatedTaskList) {
            setTrackData(updatedTaskList);
        }

        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
        setTrackingId(-1);
    };

    return (
        <div
            ref={columnRef}
            id={div_id}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            className={`
    bg-[#0f0f0f]
    w-full sm:w-80 md:w-72 lg:w-80
    min-h-[400px] md:min-h-[500px]
    p-3 sm:p-4 
    rounded-xl 
    border-2 transition-all duration-300
    ${isDropZone && !isDragging ? 'border-[#8fe60f] shadow-[0_0_30px_rgba(143,230,15,0.4)] scale-[1.02]' : 'border-[#8fe60f]/40'}
    ${!isDropZone ? 'shadow-[0_0_15px_rgba(143,230,15,0.15)]' : ''}
    flex flex-col
    backdrop-blur-sm
  `}
        >
            {/* Header with count badge */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#8fe60f]">
                <h3 className="
      uppercase 
      font-bold 
      text-base sm:text-lg 
      tracking-wide
      text-[#8fe60f]
    "
                >
                    {div_id}
                </h3>
                <span className="
      bg-[#8fe60f]/20 
      text-[#8fe60f] 
      px-2.5 py-0.5 
      rounded-full 
      text-xs 
      font-bold
      border border-[#8fe60f]/40
      animate-pulse
    ">
                    {data.filter(t => t.status === div_id).length}
                </span>
            </div>

            {/* List */}
            <ul className="space-y-2 sm:space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#8fe60f] scrollbar-track-transparent flex-1">
                {data.filter(t => t.status === div_id).length === 0 ? (
                    <div className="
            flex items-center justify-center 
            h-full min-h-[200px]
            text-gray-500 text-sm
            border-2 border-dashed border-[#8fe60f]/20 rounded-lg
          ">
                        <div className="text-center p-4">
                            <div className="text-3xl mb-2 opacity-50">📋</div>
                            <p>Drop tasks here</p>
                            {isMobile && <p className="text-xs mt-1">or swipe to move</p>}
                        </div>
                    </div>
                ) : (
                    data.map((t_data) =>
                        t_data.status === div_id ? (
                            <li
                                key={t_data.id}
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, t_data.id)}
                                onDragEnd={handleDragEnd}
                                onPointerDown={(e) => handlePointerDown(e, t_data.id)}
                                style={{
                                    transform: trackingId === t_data.id && isDragging
                                        ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`
                                        : 'none',
                                    opacity: trackingId === t_data.id && isDragging ? 0.8 : 1,
                                    transition: isDragging && trackingId === t_data.id ? 'none' : 'all 0.2s ease',
                                    zIndex: trackingId === t_data.id ? 50 : 1,
                                }}
                                className={`
            list-none 
            bg-linear-to-br from-[#1a1a1a] to-[#151515]
            p-3 sm:p-4
            rounded-lg 
            shadow-lg 
            text-white 
            text-sm 
            cursor-grab active:cursor-grabbing 
            select-none touch-none
            border-2 transition-all duration-200
            ${trackingId === t_data.id && isDragging
                                        ? 'border-[#8fe60f] shadow-[0_0_20px_rgba(143,230,15,0.6)] scale-105'
                                        : 'border-[#8fe60f]/20 hover:border-[#8fe60f] hover:shadow-[0_0_15px_rgba(143,230,15,0.3)]'
                                    }
            hover:scale-[1.02]
            relative
            overflow-hidden
          `}
                            >
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />

                                <p className="font-semibold text-[#8fe60f] mb-2 relative z-10">{t_data.task}</p>

                                <div className="flex justify-between text-[11px] text-gray-300 mb-2 relative z-10">
                                    <span className="flex items-center gap-1 bg-[#8fe60f]/10 px-2 py-1 rounded">
                                        <span>🔁</span>
                                        <span className="font-mono">{t_data.sets}</span>
                                    </span>
                                    <span className="flex items-center gap-1 bg-[#8fe60f]/10 px-2 py-1 rounded">
                                        <span>🔥</span>
                                        <span className="font-mono">{t_data.reps}</span>
                                    </span>
                                </div>

                                <p className="text-[10px] sm:text-[11px] text-gray-400 italic relative z-10 truncate">
                                    💪 Focus: {t_data.focus}
                                </p>

                                {/* Swipe hint for mobile */}
                                {isMobile && trackingId !== t_data.id && (
                                    <div className="text-[9px] text-[#8fe60f]/50 mt-2 text-center relative z-10">
                                        ← swipe to move →
                                    </div>
                                )}
                            </li>
                        ) : null
                    )
                )}
            </ul>
        </div>

    )
}

export default TrackColumn