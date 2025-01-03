import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig.ts";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const q = query(collection(db, "tasks"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addTask = createAsyncThunk(
  "tasks/add",
  async (task: { title: string; category: string; dueDate: string }) => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return { id: docRef.id, ...task };
  }
);

export const deleteTask = createAsyncThunk("tasks/delete", async (id: string) => {
  await deleteDoc(collection(db, "tasks").doc(id));
  return id;
});

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  status: "todo" | "in-progress" | "completed";
}

const initialState: TaskState = {
  tasks: [],
  status: "todo",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
