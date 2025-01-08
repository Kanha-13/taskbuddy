import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksFromFirebase, addTaskToFirebase, updateTaskInFirebase, deleteTaskFromFirebase } from "../../firebaseConfig.ts"; // Firebase service methods
import {
  addTask,
  updateTask,
  deleteTask,
  filterTasks,
  setTasks,
  Activity,
} from "./taskSlice.ts"; // Redux actions
import { Task } from "./taskSlice.ts"; // Task interface
import { RootState } from "../../store/store.ts"; // RootState type
import { deleteFileFromSupabase, uploadFileToSupabase } from "../../utils/fileUpload.ts";

interface UseTasks {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addNewTask: (task: Task, user: any) => Promise<void>;
  updateExistingTask: (task: Task, user: any) => Promise<void>;
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
      let filesLink = <Task['files']>[]
      setLoading(true);
      setError(null);
      try {
        if (task.filesData) {
          filesLink = await uploadFiles(task.filesData, user);
          task.files = filesLink;
          delete task.filesData;
        }
        const newTask = await addTaskToFirebase({ ...task, activityLogs: [{ act: "You created this task", timeStamp: `${new Date()}` }] });
        dispatch(addTask(newTask));
      } catch (err) {
        if (filesLink?.length)
          await deleteFiles(filesLink);
        setError(err instanceof Error ? err.message : "Error adding task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Update an existing task in Firebase and Redux
  const updateExistingTask = useCallback(
    async (task: Task, user: any) => {
      let updatedTask = { ...task };
      let newActivity = <Activity[]>[]
      setLoading(true);
      setError(null);
      let newfilesLink = <(string | undefined)[] | undefined>[];
      try {
        if (updatedTask.filesData?.length) {//check for new files
          newfilesLink = await uploadFiles(updatedTask.filesData, user) || []
          updatedTask.files = [...(updatedTask.files || []), ...newfilesLink];;
          newActivity.push({ act: "You uploaded file", timeStamp: `${new Date()}` });
          delete updatedTask.filesData;
        }

        if (updatedTask.filesToDelete?.length) {//check if previous files deleted
          await deleteFiles(updatedTask.filesToDelete);
          updatedTask.files = updatedTask.files?.filter(file => !(updatedTask.filesToDelete?.includes(file) ?? false));
          newActivity.push({ act: "You deleted file", timeStamp: `${new Date()}` });
          delete updatedTask.filesToDelete;
        }

        let oldTaskState = tasks.filter((taxk) => taxk.id == task.id)?.[0];
        if (oldTaskState) {

          if (task.status != oldTaskState.status) {
            newActivity.push({ act: `You changed status from ${oldTaskState.status} to ${task.status}`, timeStamp: `${new Date()}` })
          }
          if (task.category != oldTaskState.category) {
            newActivity.push({ act: `You changed category from ${oldTaskState.category} to ${task.category}`, timeStamp: `${new Date()}` })
          }
          if (task.description != oldTaskState.description) {
            newActivity.push({ act: `You updated description`, timeStamp: `${new Date()}` })
          }
          if (task.title != oldTaskState.title) {
            newActivity.push({ act: `You updated title`, timeStamp: `${new Date()}` })
          }
          if (task.dueDate != oldTaskState.dueDate) {
            newActivity.push({ act: `You updated Due date from ${oldTaskState.dueDate} to ${task.dueDate}`, timeStamp: `${new Date()}` })
          }
        }

        updatedTask.activityLogs = [...(updatedTask.activityLogs || []), ...(newActivity || [])];

        await updateTaskInFirebase(updatedTask); // Updates task in Firebase
        dispatch(updateTask(updatedTask));
      } catch (err) {
        console.log(err)
        if (newfilesLink?.length)
          await deleteFiles(newfilesLink); //deleting because firebase throws error to update the files url in db 
        setError(err instanceof Error ? err.message : "Error updating task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, tasks]
  );

  // Delete a task from Firebase and Redux
  const deleteExistingTask = useCallback(
    async (taskId: string) => {
      setLoading(true);
      setError(null);
      try {
        const tasktodelete = tasks.filter((task) => task.id == taskId)?.[0]
        if (tasktodelete) {
          if (tasktodelete.files && tasktodelete.files?.length > 0) {
            await deleteFiles(tasktodelete.files);
          }
        }
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


const uploadFiles = async (filesData: Task['filesData'], user: any) => {
  let filesLink: (string | undefined)[] = [];
  if (filesData && filesData.length > 0) {
    const uploadPromises = filesData.map(async (file) => {
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
    return;
  }
  return filesLink;
}

const deleteFiles = async (files: Task['files']) => {
  try {
    if (files?.length) {
      await Promise.all(
        files.map(async (file) => {
          if (file) {
            const sanitisedURL = file.split(' + "<<-@separator@->>" + ')[1];
            await deleteFileFromSupabase(sanitisedURL);
          }
        })
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Unable to delete files");
  }
};


export default useTasks;
