import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksFromFirebase, addTaskToFirebase, updateTaskInFirebase, deleteTaskFromFirebase } from "../../firebaseConfig.ts"; // Firebase service methods
import {
  addTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
  filterTasks,
  moveTask,
  setTasks,
} from "./taskSlice.ts"; // Redux actions
import { Task } from "./taskSlice.ts"; // Task interface
import { RootState } from "../../store/store.ts"; // RootState type

interface UseTasks {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addNewTask: (task: Omit<Task, "id">) => Promise<void>;
  updateExistingTask: (task: Task) => Promise<void>;
  deleteExistingTask: (taskId: string) => Promise<void>;
  filterTasksByParams: (params: {
    search: string;
    category: string;
    startDate?: Date | null;
    endDate?: Date | null;
  }) => void;
}

const useTasks = (): UseTasks => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filteredTasks = useSelector((state: RootState) => state.tasks.filteredTasks);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from Firebase and sync with Redux
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await fetchTasksFromFirebase();
      dispatch(setTasks(fetchedTasks));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching tasks");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Add a new task to Firebase and Redux
  const addNewTask = useCallback(
    async (task: Omit<Task, "id">) => {
      setLoading(true);
      setError(null);
      try {
        const newTask = await addTaskToFirebase(task); // Firebase service returns the created task with ID
        dispatch(addTask(newTask));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error adding task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Update an existing task in Firebase and Redux
  const updateExistingTask = useCallback(
    async (task: Task) => {
      setLoading(true);
      setError(null);
      try {
        await updateTaskInFirebase(task); // Updates task in Firebase
        dispatch(updateTask(task));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error updating task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Delete a task from Firebase and Redux
  const deleteExistingTask = useCallback(
    async (taskId: string) => {
      setLoading(true);
      setError(null);
      try {
        await deleteTaskFromFirebase(taskId); // Deletes task from Firebase
        dispatch(deleteTask(taskId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error deleting task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Filter tasks in Redux
  const filterTasksByParams = useCallback(
    (params: {
      search: string;
      category: string;
      startDate?: Date | null;
      endDate?: Date | null;
    }) => {
      dispatch(filterTasks(params));
    },
    [dispatch]
  );

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    fetchTasks,
    addNewTask,
    updateExistingTask,
    deleteExistingTask,
    filterTasksByParams,
  };
};

export default useTasks;
