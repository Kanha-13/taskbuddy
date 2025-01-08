import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksFromFirebase, addTaskToFirebase, updateTaskInFirebase, deleteTaskFromFirebase } from "../../firebaseConfig.ts"; // Firebase service methods
import {
  addTask,
  updateTask,
  deleteTask,
  filterTasks,
  setTasks,
} from "./taskSlice.ts"; // Redux actions
import { Task } from "./taskSlice.ts"; // Task interface
import { RootState } from "../../store/store.ts"; // RootState type
import { uploadFileToSupabase } from "../../utils/fileUpload.ts";

interface UseTasks {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addNewTask: (task: Task, user: any) => Promise<void>;
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
    async (task: Task, user: any) => {
      setLoading(true);
      setError(null);
      try {
        let filesLink: (string | undefined)[] = [];
        if (task.filesData && task.filesData.length > 0) {
          const uploadPromises = task.filesData.map(async (file) => {
            try {
              if (file) {
                const filelink = await uploadFileToSupabase(file.name + user?.email || "guest@guest.com", file, user.id);
                if (!filelink) throw new Error(`Unable to upload file '${file.name}'`);
                return `${file.name} + "<<-@separator@->>" + ${filelink}`;
              }
            } catch (err) {
              if (file)
                console.error(`Error uploading file '${file.name}':`, err);
              throw err;
            }
          });
          filesLink = await Promise.all(uploadPromises);
        } else {
          console.warn("No files to upload.");
        }

        task.files = filesLink;
        delete task.filesData;
        const newTask = await addTaskToFirebase(task);
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
