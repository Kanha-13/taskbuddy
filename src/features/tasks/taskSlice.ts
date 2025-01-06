import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
  category: string;
  dueDate: string;
  files?: string[];
}

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    { id: '1', title: 'Task 1', status: 'todo', category: 'Work', dueDate: '2025-01-05' },
    { id: '2', title: 'Task 2', status: 'in-progress', category: 'Personal', dueDate: '2025-01-06' },
    { id: '3', title: 'Task 3', status: 'completed', category: 'Work', dueDate: '2025-01-07' },
    { id: '4', title: 'Task 4', status: 'completed', category: 'Work', dueDate: '2025-01-07' },
    { id: '5', title: 'Task 5', status: 'completed', category: 'Work', dueDate: '2025-01-07' },
    { id: '6', title: 'Task 6', status: 'completed', category: 'Work', dueDate: '2025-01-07' },
  ],
  filteredTasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
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
    changeTaskStatus(state, action: PayloadAction<{ taskId: string; status: 'todo' | 'in-progress' | 'completed' }>) {
      const { taskId, status } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = status;
      }
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
    moveTask(state, action: PayloadAction<{ taskId: string; newStatus: 'todo' | 'in-progress' | 'completed' }>) {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, changeTaskStatus, filterTasks, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
