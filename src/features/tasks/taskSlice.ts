import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed" | "";
  category: "Work" | "Personal" | "";
  dueDate: Date | string | null;
  filesData?: (File | null)[];//for storing data when uploading files
  files?: (string | undefined)[];//for storing the files link
  filesToDelete?: (string | undefined)[];//for storing the files link
  description?: string;
}

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      if (!action.payload.id) action.payload.id = `${state.tasks.length + 1}`;
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    filterTasks(state, action: PayloadAction<{ search: string; category: string; startDate?: Date | null; endDate?: Date | null }>) {
      let filtered = state.tasks;

      if (action.payload.search) {
        filtered = filtered.filter((task) =>
          task.title.toLowerCase().includes(action.payload.search.toLowerCase())
        );
      }

      if (action.payload.category) {
        filtered = filtered.filter((task) => task.category === action.payload.category);
      }

      if (action.payload.startDate) {
        filtered = filtered.filter(
          (task) => new Date(task.dueDate).setHours(0, 0, 0, 0) >= new Date(action.payload.startDate).setHours(0, 0, 0, 0)
        );
      }

      if (action.payload.endDate) {
        filtered = filtered.filter(
          (task) => new Date(task.dueDate).setHours(0, 0, 0, 0) <= new Date(action.payload.endDate).setHours(0, 0, 0, 0)
        );
      }

      state.filteredTasks = filtered;
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, filterTasks } = taskSlice.actions;
export default taskSlice.reducer;
