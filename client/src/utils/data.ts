export const updatedWorkoutPlan = [
  // --- Completed (completed) - Tasks finished in the session ---
  {
    id: 501,
    task: "5-min Cardio Warm-up",
    sets: 1,
    reps: 5, // Changed to reps to represent 5 minutes or 5 cycles
    focus: "Cardio",
    status: "completed"
  },
  {
    id: 502,
    task: "Barbell Squats",
    sets: 4,
    reps: 6,
    focus: "Legs",
    status: "completed"
  },
  {
    id: 503,
    task: "Lat Pulldowns",
    sets: 3,
    reps: 10,
    focus: "Back",
    status: "completed"
  },
  {
    id: 504,
    task: "Dumbbell Shoulder Press",
    sets: 3,
    reps: 12,
    focus: "Shoulders",
    status: "completed"
  },

  // --- Doing (doing) - Tasks currently in progress ---
  {
    id: 505,
    task: "Incline Dumbbell Press",
    sets: 3,
    reps: 10,
    focus: "Chest",
    status: "doing"
  },
  {
    id: 506,
    task: "Leg Extensions",
    sets: 3,
    reps: 15,
    focus: "Legs",
    status: "doing"
  },

  // --- To Do (todo) - Remaining tasks ---
  {
    id: 507,
    task: "Cable Curls",
    sets: 3,
    reps: 12,
    focus: "Biceps",
    status: "todo"
  },
  {
    id: 508,
    task: "Rope Tricep Pushdowns",
    sets: 3,
    reps: 15,
    focus: "Triceps",
    status: "todo"
  },
  {
    id: 509,
    task: "Plank Hold",
    sets: 3,
    reps: 60, // Changed from duration ("60 seconds") to reps (60)
    focus: "Core",
    status: "todo"
  },
  {
    id: 510,
    task: "Stretching Cool-down",
    sets: 1,
    reps: 10, // Changed from duration ("10 minutes") to reps (10)
    focus: "Recovery",
    status: "todo"
  }
];